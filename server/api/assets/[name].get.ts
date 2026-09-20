/**
 * Streams a blog image from NestBackend's public /assets/:name through this
 * server, so the browser never needs to know (or be able to reach) the API's
 * address - it only ever talks to this origin.
 */
export default defineEventHandler((event) => {
  const name = getRouterParam(event, 'name') ?? ''

  // A bare filename only: no path separators or traversal.
  if (!/^[\w][\w.-]{0,199}$/.test(name) || name.includes('..')) {
    throw createError({ statusCode: 404, statusMessage: 'Image not found' })
  }

  const { nestApiUrl } = useRuntimeConfig(event)
  return sendProxy(event, `${nestApiUrl.replace(/\/+$/, '')}/assets/${encodeURIComponent(name)}`)
})
