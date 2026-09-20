// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  app: {
    buildAssetsDir: '/_app/'
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  runtimeConfig: {
    // Everything here is server-only (nothing is public): the Nuxt server is the
    // only thing that talks to NestBackend - blog reads are HMAC-signed, images
    // are proxied. Override with NUXT_NEST_API_URL / NUXT_BLOG_HMAC_SECRET.
    nestApiUrl: 'http://localhost:4000/v1/api',
    blogHmacSecret: ''
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
