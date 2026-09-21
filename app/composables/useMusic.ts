export const TRACK = { id: 'VePaI3jX4Sk', title: 'Go Solo', artist: 'Tom Rosenthal' } as const

export type MusicPhase = 'idle' | 'loading' | 'playing' | 'paused'

// Just the slice of the YouTube IFrame Player API we use - no extra dependency.
interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  mute: () => void
  unMute: () => void
  setVolume: (volume: number) => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
  destroy: () => void
}
interface YTEvent {
  target: YTPlayer
  data: number
}
interface YTNamespace {
  Player: new (el: HTMLElement, options: {
    width: string
    height: string
    videoId: string
    playerVars: Record<string, string | number>
    events: {
      onReady: (e: YTEvent) => void
      onStateChange: (e: YTEvent) => void
      onError: (e: YTEvent) => void
    }
  }) => YTPlayer
}
declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

const API_TIMEOUT_MS = 8000
// The API script loaded but the player iframe never reported ready (network/embed trouble).
const READY_TIMEOUT_MS = 10000
// If nothing is playing this long after the player is ready, the browser blocked
// autoplay (iOS Safari does) - leave the pill on "paused" so a tap can start it.
const AUTOSTART_GRACE_MS = 3500
const VOLUME = 60
const DECLINED_KEY = 'music-declined'

// The player and its host element live outside Vue state on purpose (they're
// browser objects, not something to make reactive). `session` is bumped whenever
// a run is cancelled/finished so late callbacks from an old run are ignored.
let player: YTPlayer | null = null
let host: HTMLDivElement | null = null
let apiPromise: Promise<YTNamespace> | null = null
let graceTimer: ReturnType<typeof setTimeout> | undefined
let readyTimer: ReturnType<typeof setTimeout> | undefined
let session = 0

/** Loads the YouTube IFrame API on demand - only ever called after the visitor says yes. */
function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (apiPromise) return apiPromise

  apiPromise = new Promise<YTNamespace>((resolve, reject) => {
    const timeout = setTimeout(() => {
      apiPromise = null
      reject(new Error('YouTube API timed out'))
    }, API_TIMEOUT_MS)

    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      clearTimeout(timeout)
      resolve(window.YT!)
    }

    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onerror = () => {
      clearTimeout(timeout)
      apiPromise = null
      script.remove()
      reject(new Error('YouTube API could not be loaded'))
    }
    document.head.appendChild(script)
  })

  return apiPromise
}

/**
 * "Want some music?" flow. Saying yes starts the song AND turns on the film
 * theme; saying no touches nothing (and makes no request to YouTube). If the
 * player can't start, everything is rolled back so the site is never left
 * half-themed.
 */
export function useMusic() {
  const filmActive = useFilmMode()
  const phase = useState<MusicPhase>('music-phase', () => 'idle')
  const muted = useState<boolean>('music-muted', () => false)
  const promptOpen = useState<boolean>('music-prompt-open', () => false)
  const toast = useToast()

  function teardown() {
    clearTimeout(graceTimer)
    clearTimeout(readyTimer)
    try {
      player?.destroy()
    } catch {
      // the iframe may already be gone
    }
    player = null
    host?.remove()
    host = null
  }

  function reset() {
    session++
    teardown()
    filmActive.value = false
    phase.value = 'idle'
    muted.value = false
  }

  function fail(reason: string) {
    console.warn('[music]', reason)
    reset()
    toast.add({
      title: 'The tape snapped',
      description: 'Couldn\'t start the music - keeping everything the way it was.',
      icon: 'i-lucide-music-off',
      color: 'neutral'
    })
  }

  async function accept() {
    promptOpen.value = false
    if (phase.value !== 'idle') return

    const mine = ++session
    filmActive.value = true
    phase.value = 'loading'

    try {
      const YT = await loadYouTubeApi()
      if (mine !== session) return // stopped while the API was loading

      // Off-screen but real-sized (not display:none) so the browser doesn't
      // throttle or refuse autoplay for a hidden/tiny frame.
      host = document.createElement('div')
      host.setAttribute('aria-hidden', 'true')
      host.style.cssText = 'position:fixed;left:-9999px;top:0;width:200px;height:200px;pointer-events:none;'
      const mount = document.createElement('div')
      host.appendChild(mount)
      document.body.appendChild(host)

      player = new YT.Player(mount, {
        width: '200',
        height: '200',
        videoId: TRACK.id,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          rel: 0,
          loop: 1,
          playlist: TRACK.id, // a single video only loops when it's also its own "playlist"
          origin: window.location.origin
        },
        events: {
          onReady: (e) => {
            if (mine !== session) return
            clearTimeout(readyTimer)
            e.target.setVolume(VOLUME)
            e.target.playVideo()
            graceTimer = setTimeout(() => {
              if (mine === session && phase.value === 'loading') phase.value = 'paused'
            }, AUTOSTART_GRACE_MS)
          },
          onStateChange: (e) => {
            if (mine !== session) return
            if (e.data === 1) {
              clearTimeout(graceTimer)
              phase.value = 'playing'
            } else if (e.data === 2) {
              phase.value = 'paused'
            } else if (e.data === 0) {
              e.target.seekTo(0, true)
              e.target.playVideo()
            }
          },
          // 101/150 = embedding disabled for this video; others = network etc.
          onError: e => mine === session && fail(`player error ${e.data}`)
        }
      })

      readyTimer = setTimeout(() => {
        if (mine === session) fail('player never became ready')
      }, READY_TIMEOUT_MS)
    } catch (error) {
      if (mine === session) fail((error as Error).message)
    }
  }

  function decline() {
    promptOpen.value = false
    try {
      sessionStorage.setItem(DECLINED_KEY, '1')
    } catch {
      // storage can be blocked - then we simply ask again next load
    }
  }

  /** Opens the prompt after `delay`, unless declined earlier in this tab or already on. */
  function schedulePrompt(delay = 1500) {
    try {
      if (sessionStorage.getItem(DECLINED_KEY)) return () => {}
    } catch {
      // ignore - fall through and ask
    }
    if (filmActive.value) return () => {}

    const timer = setTimeout(() => {
      if (phase.value === 'idle') promptOpen.value = true
    }, delay)
    return () => clearTimeout(timer)
  }

  function toggle() {
    if (!player) return
    if (phase.value === 'playing') player.pauseVideo()
    else player.playVideo()
  }

  function toggleMute() {
    if (!player) return
    if (muted.value) player.unMute()
    else player.mute()
    muted.value = !muted.value
  }

  /** "Back to normal": stop the song and drop the theme. */
  function stop() {
    reset()
  }

  return { phase, muted, promptOpen, filmActive, accept, decline, schedulePrompt, toggle, toggleMute, stop }
}
