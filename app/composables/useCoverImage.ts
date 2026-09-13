/**
 * Cover images are stored as bare filenames and served by the Nest
 * AssetsController at <apiBase>/assets/<filename>.
 */
export function useCoverImage() {
  const config = useRuntimeConfig()

  function coverUrl(filename: string | null | undefined): string | undefined {
    if (!filename) return undefined
    if (filename.startsWith('http') || filename.startsWith('/')) return filename

    return `${config.public.apiBase}/assets/${filename}`
  }

  return { coverUrl }
}
