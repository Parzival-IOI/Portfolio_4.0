<script setup lang="ts">
import type { ApiPage, BlogListItem } from '~/types/blog'

const { api } = useApi()
const { coverUrl } = useCoverImage()

const PAGE_SIZE = 9
const page = ref(1)

const { data, status } = await useAsyncData(
  'blog-list',
  () => api<ApiPage<BlogListItem>>('/blog/findAll', {
    query: {
      orderBy: 'DESC',
      sortBy: 'CREATED_AT',
      page: String(page.value - 1),
      size: String(PAGE_SIZE)
    }
  }),
  { watch: [page] }
)

useSeoMeta({
  title: 'Blog',
  description: 'Writing on web development, APIs, and the things that break in production.'
})
</script>

<template>
  <UContainer class="py-16 sm:py-20">
    <UPageHeader
      title="Blog"
      description="Writing on web development, APIs, and the things that break in production."
    />

    <div class="mt-12">
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
