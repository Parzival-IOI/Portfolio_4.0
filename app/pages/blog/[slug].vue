<script setup lang="ts">
import { site } from '~/config/site'
import type { BlogPostDetail } from '~/types/blog'

const route = useRoute()
const { api } = useApi()
const { coverUrl } = useCoverImage()

const slug = computed(() => String(route.params.slug))

const { data: post } = await useAsyncData(
  () => `blog-${slug.value}`,
  () => api<BlogPostDetail>(`/blog/findBySlug/${slug.value}`)
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: post.value.title,
  description: post.value.excerpt ?? undefined,
  ogTitle: post.value.title,
  ogDescription: post.value.excerpt ?? undefined,
  ogImage: coverUrl(post.value.coverImage)
})

const publishedAt = computed(() =>
  new Date(post.value!.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
)
</script>

<template>
  <UContainer
    v-if="post"
    class="relative py-16 sm:py-20 max-w-3xl"
  >
    <div class="relative">
      <!-- Pikachu, running back toward the post list. -->
      <PokemonSprite
        :src="site.pokemon.pikachu"
        size="size-9"
        flip
        class="top-0 left-20 sm:left-24"
      />
      <UButton
        to="/blog"
        label="All posts"
        icon="i-lucide-arrow-left"
        variant="link"
        color="neutral"
        class="-ms-3 mb-6"
      />
    </div>

    <article>
      <header class="relative space-y-4">
        <!-- Hawlucha, perched by the post title. -->
        <PokemonSprite
          :src="site.pokemon.hawlucha"
          size="size-12"
          class="top-0 right-0"
        />
        <p class="text-sm text-muted font-numeric">
          {{ publishedAt }}
        </p>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-tight text-highlighted">
          {{ post.title }}
        </h1>
        <p
          v-if="post.excerpt"
          class="text-lg text-muted"
        >
          {{ post.excerpt }}
        </p>
      </header>

      <img
        v-if="coverUrl(post.coverImage)"
        :src="coverUrl(post.coverImage)"
        :alt="post.title"
        class="w-full rounded-xl my-10 ring ring-default"
      >

      <USeparator
        v-else
        class="my-10"
      />

      <PostBody :source="post.description" />
    </article>

    <USeparator class="my-12" />

    <div class="relative">
      <!-- Charizard stands guard on top of the CTA, same as on the home page. -->
      <PokemonSprite
        :src="site.pokemon.charizard"
        size="size-16"
        flip
        class="-top-8 right-6"
      />
      <UPageCTA
        title="Enjoyed this?"
        description="I write about what I build. Reach out if you want to talk about it."
        variant="subtle"
        :links="[{ label: 'Get in touch', to: '/#contact', icon: 'i-lucide-mail' }]"
      />
    </div>
  </UContainer>
</template>
