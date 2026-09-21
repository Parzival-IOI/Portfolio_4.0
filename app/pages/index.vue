<script setup lang="ts">
import { site } from '~/config/site'
import type { ApiPage, BlogListItem } from '~/types/blog'

// Fetched through our own Nuxt server route (which signs the call to Nest), so
// this is rendered on the server and shipped in the HTML.
const { data: latest } = await useFetch<ApiPage<BlogListItem>>('/api/blog', {
  key: 'latest-posts',
  query: { page: 1, size: 3 }
})

const { coverUrl } = useCoverImage()

// Everyday wording normally, the nostalgic film version while film mode is on.
const copy = useCopy()
const services = computed(() => site.services.map((service, i) => ({ ...service, description: copy.value.serviceDescriptions[i] ?? service.description })))

// The hero's glyph rain is blue by default; amber in film mode. Remounted via
// :key because the rain reads its colors once, when it starts.
const filmActive = useFilmMode()
const FILM_RAIN = [0.93, 0.62, 0.22] as [number, number, number]
const FILM_RAIN_HEAD = [1, 0.82, 0.45] as [number, number, number]
</script>

<template>
  <div>
    <UPageHero
      :title="site.name"
      :description="copy.heroTagline"
      orientation="horizontal"
      class="relative isolate"
      :ui="{ title: 'text-5xl sm:text-6xl font-bold tracking-tight', container: 'py-20 sm:py-28' }"
      :links="[{
        label: copy.heroBlogButton,
        to: '/blog',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }, {
        label: 'Download resume',
        to: site.resume,
        external: true,
        download: true,
        icon: 'i-lucide-download',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    >
      <template #top>
        <ClientOnly>
          <GlyphRain
            :key="filmActive ? 'film' : 'default'"
            :color="filmActive ? FILM_RAIN : undefined"
            :head-color="filmActive ? FILM_RAIN_HEAD : undefined"
          />
        </ClientOnly>
      </template>

      <template #headline>
        <UBadge
          :label="site.role"
          variant="subtle"
          size="lg"
        />
      </template>

      <!-- Mobile: photo first, above the text (order-first). Desktop: back to its
           natural side-by-side spot next to the text (lg:order-none). -->
      <div class="order-first flex justify-center lg:order-none">
        <div class="relative">
          <ProfileAvatar size="size-56 lg:size-72" />
          <!-- Hawlucha's a wrestler - flying kick into frame next to the photo. -->
          <PokemonSprite
            :src="site.pokemon.hawlucha"
            size="size-14"
            flip
            class="bottom-4 -left-20"
          />
        </div>
      </div>
    </UPageHero>

    <UContainer class="relative pb-16">
      <TechMarquee />
      <!-- Pikachu runs alongside the scrolling tech marquee. -->
      <PokemonSprite
        :src="site.pokemon.pikachu"
        size="size-10"
        class="-top-7.5 left-44"
      />
    </UContainer>

    <UPageSection
      title="What I do"
      :description="copy.whatIDoIntro"
      :features="services"
    />

    <UPageSection
      v-if="latest?.items?.length"
      title="Latest writing"
      :description="copy.latestWritingIntro"
      :ui="{ container: 'pt-0' }"
    >
      <UBlogPosts>
        <UBlogPost
          v-for="post in latest.items"
          :key="post.id"
          :title="post.title"
          :description="post.excerpt ?? undefined"
          :date="post.datetime"
          :image="coverUrl(post.coverImage) ?? undefined"
          :to="`/blog/${post.slug}`"
        />
      </UBlogPosts>

      <div class="mt-10 text-center">
        <UButton
          to="/blog"
          label="All posts"
          trailing-icon="i-lucide-arrow-right"
          variant="subtle"
        />
      </div>
    </UPageSection>

    <UContainer class="relative pb-20">
      <!-- Charizard stands guard on top of the "hire me" card. -->
      <PokemonSprite
        :src="site.pokemon.charizard"
        size="size-20"
        class="-top-17.5 right-10 z-10"
      />
      <UPageCTA
        :title="copy.ctaTitle"
        :description="copy.ctaDescription(site.email)"
        variant="subtle"
        :links="[{
          label: 'Get in touch',
          to: `mailto:${site.email}`,
          icon: 'i-lucide-mail',
          size: 'lg'
        }, {
          label: 'Download resume',
          to: site.resume,
          external: true,
          download: true,
          icon: 'i-lucide-download',
          size: 'lg',
          color: 'neutral',
          variant: 'subtle'
        }]"
      />
    </UContainer>
  </div>
</template>
