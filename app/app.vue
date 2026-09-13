<script setup lang="ts">
import { site } from '~/config/site'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: `${site.name} — ${site.role}`,
  description: site.tagline,
  ogTitle: `${site.name} — ${site.role}`,
  ogDescription: site.tagline,
  twitterCard: 'summary_large_image'
})

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' }
]
</script>

<template>
  <UApp>
    <UHeader :ui="{ root: 'border-default' }">
      <template #left>
        <NuxtLink
          to="/"
          class="focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1"
          aria-label="Home"
        >
          <AppLogo />
        </NuxtLink>
      </template>

      <UNavigationMenu :items="navigation" />

      <template #right>
        <UColorModeButton />

        <UButton
          v-for="social in site.socials"
          :key="social.label"
          :to="social.to"
          target="_blank"
          rel="noopener"
          :icon="social.icon"
          :aria-label="social.label"
          color="neutral"
          variant="ghost"
          class="hidden sm:inline-flex"
        />

        <UButton
          :to="`mailto:${site.email}`"
          label="Hire me"
          trailing-icon="i-lucide-arrow-up-right"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="navigation"
          orientation="vertical"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter :ui="{ root: 'border-t border-default' }">
      <template #top>
        <UContainer class="py-12">
          <div class="grid gap-10 md:grid-cols-3">
            <div class="space-y-3">
              <AppLogo />
              <p class="text-sm text-muted max-w-xs">
                {{ site.tagline }}
              </p>
            </div>

            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-highlighted">
                Contact
              </h3>
              <ul class="space-y-2 text-sm text-muted">
                <li>
                  <ULink
                    :to="`mailto:${site.email}`"
                    class="hover:text-primary"
                  >
                    {{ site.email }}
                  </ULink>
                </li>
                <li v-if="site.location">
                  {{ site.location }}
                </li>
              </ul>
              <UButton
                :to="site.resume"
                download
                external
                icon="i-lucide-download"
                label="Download resume"
                variant="subtle"
                size="sm"
              />
            </div>

            <div class="space-y-3">
              <h3 class="text-sm font-semibold text-highlighted">
                Elsewhere
              </h3>
              <ul class="space-y-2 text-sm">
                <li
                  v-for="social in site.socials"
                  :key="social.label"
                >
                  <ULink
                    :to="social.to"
                    target="_blank"
                    rel="noopener"
                    class="inline-flex items-center gap-2 text-muted hover:text-primary"
                  >
                    <UIcon
                      :name="social.icon"
                      class="size-4"
                    />
                    {{ social.label }}
                  </ULink>
                </li>
              </ul>
            </div>
          </div>
        </UContainer>
      </template>

      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} {{ site.name }}
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
