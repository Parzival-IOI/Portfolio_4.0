<script setup lang="ts">
import { site } from '~/config/site'

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title: `${site.name} - ${site.role}`,
  description: site.tagline,
  ogTitle: `${site.name} - ${site.role}`,
  ogDescription: site.tagline,
  twitterCard: 'summary_large_image'
})

const navigation = [
  { label: 'Home', to: '/', icon: 'i-lucide-house' },
  { label: 'About', to: '/about', icon: 'i-lucide-user-round' },
  { label: 'Blog', to: '/blog', icon: 'i-lucide-pen-line' }
]

const colorMode = useColorMode()
const copy = useCopy()
</script>

<template>
  <UApp>
    <ClientOnly>
      <PokemonRoam />
    </ClientOnly>

    <!-- Optional background music. Only after a visitor says yes does the song
         start and the film-camera theme switch on; otherwise none of this shows. -->
    <ClientOnly>
      <FilmOverlay />
      <MusicPrompt />
      <MusicPill />
    </ClientOnly>

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
        <span class="relative inline-flex">
          <UColorModeButton />
          <!-- Gengar is a ghost type - he only shows up lurking in the shadow of the dark-mode toggle. -->
          <ClientOnly>
            <PokemonSprite
              v-if="colorMode.value === 'dark'"
              :src="site.pokemon.gengar"
              size="size-8"
              class="-bottom-4 -right-6 z-10"
            />
          </ClientOnly>
        </span>

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
          class="-mx-2.5"
        />

        <USeparator class="my-6" />

        <!-- The header's right slot hides these below `sm`, so they'd
             otherwise be unreachable on mobile even with the menu open. -->
        <div class="flex items-center justify-center gap-2">
          <UButton
            v-for="social in site.socials"
            :key="social.label"
            :to="social.to"
            target="_blank"
            rel="noopener"
            :icon="social.icon"
            :label="social.label"
            color="neutral"
            variant="ghost"
          />
        </div>
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
                {{ copy.footerBlurb }}
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
        <div class="relative flex items-center ps-9">
          <!-- Snorlax is famous for blocking the way and refusing to move - fitting, on the copyright line. -->
          <PokemonSprite
            :src="site.pokemon.snorlax"
            size="size-9"
            flip
            class="top-1/2 left-0 -translate-y-1/2"
          />
          <p class="text-sm text-muted">
            © {{ new Date().getFullYear() }} {{ site.name }}
          </p>
        </div>
      </template>
    </UFooter>
  </UApp>
</template>
