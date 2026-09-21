import { baseCopy, filmCopy } from '~/config/copy'

/**
 * The site's wording for the current theme: the everyday text normally, the
 * nostalgic version while film mode is on. Film state only ever turns on in the
 * browser, so the server always renders the everyday copy (no hydration
 * mismatch, and SEO/OG text stays the default).
 */
export function useCopy() {
  const film = useFilmMode()
  return computed(() => film.value ? filmCopy : baseCopy)
}
