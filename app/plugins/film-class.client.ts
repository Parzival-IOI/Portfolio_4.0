/**
 * Mirrors the film-theme state onto <html class="film"> (the same way the
 * color-mode module toggles `dark`), plus a short-lived `film-fade` class so the
 * palette change cross-fades instead of snapping.
 */
export default defineNuxtPlugin(() => {
  const film = useFilmMode()
  const root = document.documentElement
  let fadeTimer: ReturnType<typeof setTimeout> | undefined

  watch(film, (on) => {
    root.classList.add('film-fade')
    clearTimeout(fadeTimer)
    fadeTimer = setTimeout(() => root.classList.remove('film-fade'), 1300)
    root.classList.toggle('film', on)
  })
})
