/**
 * Whether the film-camera theme is on. Shared state only - toggling the
 * `film` class on <html> is done by plugins/film-class.client.ts, and the music
 * flow that turns it on/off lives in useMusic.ts.
 */
export function useFilmMode() {
  return useState<boolean>('film-active', () => false)
}
