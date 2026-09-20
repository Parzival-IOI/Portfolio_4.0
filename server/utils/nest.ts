import { createHmac } from 'node:crypto'
import type { H3Event } from 'h3'

interface Envelope<T> {
  data: T
}

/**
 * Signed GET against NestBackend, server-side only.
 *
 * The HMAC key (runtimeConfig.blogHmacSecret) never leaves Nitro - the browser
 * only ever talks to our own /api/* routes. Signature scheme matches
 * NestBackend's HmacGuard for bodyless requests:
 *   X-Timestamp = unix ms
 *   X-Signature = hex(HMAC-SHA256(secret, `${timestamp}.GET.${path}${query}`))
 * where path+query is exactly what Nest receives as `originalUrl`, so the URL
 * string we sign is the same string we request.
 */
export async function nestGet<T>(
  event: H3Event,
  path: string,
  query: Record<string, string | number> = {}
): Promise<T> {
  const { nestApiUrl, blogHmacSecret } = useRuntimeConfig(event)

  if (!blogHmacSecret) {
    console.error('[nest] NUXT_BLOG_HMAC_SECRET is not set - cannot sign requests')
    throw createError({ statusCode: 500, statusMessage: 'Blog API is not configured' })
  }

  const search = new URLSearchParams(Object.entries(query).map(([key, value]) => [key, String(value)])).toString()
  const url = new URL(`${nestApiUrl.replace(/\/+$/, '')}${path}${search ? `?${search}` : ''}`)

  const timestamp = String(Date.now())
  const signature = createHmac('sha256', blogHmacSecret)
    .update(`${timestamp}.GET.${url.pathname}${url.search}`)
    .digest('hex')

  try {
    const res = await $fetch<Envelope<T>>(url.toString(), {
      headers: { 'X-Timestamp': timestamp, 'X-Signature': signature }
    })
    return res.data
  } catch (error) {
    const status = (error as { statusCode?: number, response?: { status?: number } }).response?.status
      ?? (error as { statusCode?: number }).statusCode

    if (status === 404) {
      throw createError({ statusCode: 404, statusMessage: 'Not found' })
    }

    // Log the real reason server-side; the client just learns the service is down.
    console.error(`[nest] GET ${url.pathname} failed (${status ?? 'no response'}):`, (error as Error).message)
    throw createError({ statusCode: 502, statusMessage: 'Blog service unavailable' })
  }
}
