/**
 * Cover images are stored as bare filenames. They're served through this app's
 * own /api/assets/:name route (server/api/assets), which proxies NestBackend's
 * public assets - so the API address is never exposed to the browser.
 */
export function useCoverImage() {
  function coverUrl(filename: string | null | undefined): string | undefined {
    if (!filename) return undefined
    if (filename.startsWith('http') || filename.startsWith('/')) return filename

    return `/api/assets/${encodeURIComponent(filename)}`
  }

  return { coverUrl }
}
