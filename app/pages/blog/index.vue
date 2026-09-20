<script setup lang="ts">
import { site } from '~/config/site'
import type { ApiPage, BlogListItem } from '~/types/blog'

const { coverUrl } = useCoverImage()

const PAGE_SIZE = 9
const page = ref(1)

// Same-origin call to our Nuxt server route (which signs the request to Nest).
// Server-rendered on first load; the reactive `page` in the query refetches
// from the browser when paginating.
const { data, status } = await useFetch<ApiPage<BlogListItem>>('/api/blog', {
  key: 'blog-list',
  query: { page, size: PAGE_SIZE }
})

useSeoMeta({
  title: 'Blog',
  description: 'Writing on web development, APIs, and the things that break in production.'
})
</script>

<template>
  <UContainer class="relative py-16 sm:py-20">
    <!-- Charizard keeps watch over the blog. -->
    <PokemonSprite
      :src="site.pokemon.charizard"
      size="size-16"
      class="top-43 right-24"
    />

    <UPageHeader
      title="Blog"
      description="Writing on web development, APIs, and the things that break in production."
    />

    <div class="relative mt-12">
      <!-- Hawlucha, perched above the posts grid. -->
      <PokemonSprite
        :src="site.pokemon.hawlucha"
        size="size-12"
        flip
        class="-top-10 left-0"
      />
      <!-- Pikachu, running toward whatever's next. -->
      <PokemonSprite
        :src="site.pokemon.pikachu"
        size="size-10"
        flip
        class="-bottom-10 right-0"
      />
      <div
        v-if="status === 'pending'"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <USkeleton
          v-for="i in 6"
          :key="i"
          class="h-64 rounded-xl"
        />
      </div>

      <UError
        v-else-if="status === 'error'"
        :error="{ statusCode: 503, statusMessage: 'Cannot reach the API', message: 'The blog service is not responding. Check that the NestBackend server is running.' }"
        :clear="false"
      />

      <UEmpty
        v-else-if="!data?.items?.length"
        icon="i-lucide-pen-line"
        title="No posts yet"
        description="The first one is being written."
      />

      <template v-else>
        <UBlogPosts>
          <UBlogPost
            v-for="post in data.items"
            :key="post.id"
            :title="post.title"
            :description="post.excerpt ?? undefined"
            :date="post.datetime"
            :image="coverUrl(post.coverImage) ?? undefined"
            :to="`/blog/${post.slug}`"
          />
        </UBlogPosts>

        <div
          v-if="data.total > PAGE_SIZE"
          class="mt-12 flex justify-center"
        >
          <UPagination
            v-model:page="page"
            :total="data.total"
            :items-per-page="PAGE_SIZE"
          />
        </div>
      </template>
    </div>
  </UContainer>
</template>
