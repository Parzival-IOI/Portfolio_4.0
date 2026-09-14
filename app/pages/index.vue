<script setup lang="ts">
import { site } from '~/config/site'
import type { ApiPage, BlogListItem } from '~/types/blog'

const { api } = useApi()

const { data: latest } = await useAsyncData('latest-posts', () =>
  api<ApiPage<BlogListItem>>('/blog/findAll', {
    query: { orderBy: 'DESC', sortBy: 'CREATED_AT', page: '0', size: '3' }
  }).catch(() => ({ items: [], page: 0, total: 0 }) as ApiPage<BlogListItem>)
)

const { coverUrl } = useCoverImage()
</script>

<template>
  <div>
    <UPageHero
      :title="site.name"
      :description="site.tagline"
      orientation="horizontal"
      :ui="{ title: 'text-5xl sm:text-6xl font-bold tracking-tight', container: 'py-20 sm:py-28' }"
      :links="[{
        label: 'Read the blog',
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
      :description="site.about"
      :features="site.services"
    />

    <UPageSection
      v-if="latest?.items?.length"
      title="Latest writing"
      description="Half-baked opinions about software, lightly edited to look intentional."
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
        title="Have something you want built?"
        :description="`Email me at ${site.email} - I promise to reply faster than my code compiles.`"
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
