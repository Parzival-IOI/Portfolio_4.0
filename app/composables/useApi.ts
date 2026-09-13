import type { ApiEnvelope } from '~/types/blog'

type ApiOptions = Parameters<typeof $fetch>[1]

/**
 * Thin wrapper over $fetch for the NestBackend's public API.
 *
 * - prefixes every call with runtimeConfig.public.apiBase
 * - unwraps the ResponseSuccess envelope so callers see plain data
 */
export function useApi() {
  const config = useRuntimeConfig()

  async function raw<T>(path: string, options: ApiOptions = {}): Promise<T> {
    return await $fetch<T>(path, {
      ...options,
      baseURL: config.public.apiBase
    })
  }

  /** Same as raw(), but returns envelope.data. */
  async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
    const res = await raw<ApiEnvelope<T>>(path, options)
    return res.data
  }

  return { api, raw }
}
