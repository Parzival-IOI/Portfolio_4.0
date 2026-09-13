<script setup lang="ts">
import { site } from '~/config/site'
import type { EducationItem, ExperienceItem } from '~/config/site'
import type { TimelineItem } from '@nuxt/ui'

const experienceItems: (TimelineItem & { highlights?: string[] })[] = site.experience.map((item: ExperienceItem) => ({
  date: item.period,
  title: `${item.role} · ${item.org}`,
  description: item.location ? `${item.description} (${item.location})` : item.description,
  highlights: item.highlights,
  avatar: item.logo ? { src: item.logo, alt: item.org } : undefined
}))

const educationItems: (TimelineItem & { highlights?: string[] })[] = site.education.map((item: EducationItem) => ({
  date: item.period,
  title: `${item.degree} · ${item.school}`,
  description: item.description,
  highlights: item.highlights,
  avatar: item.logo ? { src: item.logo, alt: item.school } : undefined
}))

useSeoMeta({
  title: 'About',
  description: site.about
})
</script>

<template>
  <div>
    <UPageHero
      title="About"
      :description="site.about"
      :ui="{ container: 'py-16 sm:py-20' }"
    />

    <UPageSection
      title="Experience"
      description="Where I've worked and what I did there."
    >
      <UTimeline
        :items="experienceItems"
        size="xl"
        :ui="{ indicator: 'size-12', wrapper: 'mt-0' }"
        class="max-w-2xl mx-auto"
      >
        <template #description="{ item }">
          <TimelineDetails :item="item" />
        </template>
      </UTimeline>
    </UPageSection>

    <UPageSection
      title="Education"
      description="Formal education and training."
      :ui="{ container: 'pt-0' }"
    >
      <UTimeline
        :items="educationItems"
        size="xl"
        :ui="{ indicator: 'size-12', wrapper: 'mt-0' }"
        class="max-w-2xl mx-auto"
      >
        <template #description="{ item }">
          <TimelineDetails :item="item" />
        </template>
      </UTimeline>
    </UPageSection>
  </div>
</template>
