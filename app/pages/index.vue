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
    </UPageHero>

    <UContainer class="pb-16">
      <TechMarquee />
    </UContainer>

    <UPageSection
      title="What I do"
      :description="site.about"
      :features="site.services"
    />

    <UPageSection
      v-if="latest?.items?.length"
      title="Latest writing"
      description="Notes on the things I build and the problems they turned out to hide."
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

    <UContainer class="pb-20">
      <UPageCTA
        title="Have something you want built?"
        :description="`The fastest way to reach me is email — ${site.email}.`"
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
