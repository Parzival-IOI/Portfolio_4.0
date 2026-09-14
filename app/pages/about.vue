<script setup lang="ts">
import { site } from '~/config/site'
import type { EducationItem, ExperienceItem } from '~/config/site'
import type { TimelineItem } from '@nuxt/ui'

const experienceItems: (TimelineItem & { highlights?: string[], isPokemon?: boolean })[] = site.experience.map((item: ExperienceItem) => ({
  date: item.period,
  title: `${item.role} · ${item.org}`,
  description: item.location ? `${item.description} (${item.location})` : item.description,
  highlights: item.highlights,
  isPokemon: item.org === 'Pokémon GO',
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
  description: site.aboutIntro
})
</script>

<template>
  <div class="relative">
    <UPageHero
      title="About"
      :description="site.aboutIntro"
      :ui="{ container: 'py-16 sm:py-20' }"
    />

    <UPageSection
      title="Experience"
      description="Four job titles, one employer, and a steadily rising tolerance for banking acronyms."
    >
      <div class="mx-auto max-w-2xl">
        <UTimeline
          :items="experienceItems"
          size="xl"
          :ui="{ indicator: 'size-12', wrapper: 'mt-0' }"
        >
          <template #description="{ item }">
            <div :class="item.isPokemon && 'relative'">
              <TimelineDetails :item="item" />
              <template v-if="item.isPokemon">
                <!-- Charizard, standing right on the XP line - and Hawlucha faces him down. -->
                <PokemonSprite
                  :src="site.pokemon.charizard"
                  size="size-14"
                  flip
                  class="-bottom-1 right-44"
                />
                <PokemonSprite
                  :src="site.pokemon.hawlucha"
                  size="size-12"
                  class="-bottom-1 right-24"
                />
              </template>
            </div>
          </template>
        </UTimeline>
      </div>
    </UPageSection>

    <UPageSection
      title="Education"
      description="Two degrees, same university - apparently I liked it enough to stay for round two."
      :ui="{ container: 'pt-0' }"
    >
      <UTimeline
        :items="educationItems"
        size="xl"
        :ui="{ indicator: 'size-12', wrapper: 'mt-0' }"
        class="mx-auto max-w-2xl"
      >
        <template #description="{ item }">
          <TimelineDetails :item="item" />
        </template>
      </UTimeline>
    </UPageSection>

    <!-- Pikachu, running along the bottom edge of the page - right on the line into the footer. -->
    <PokemonSprite
      :src="site.pokemon.pikachu"
      size="size-10"
      flip
      class="-bottom-1 left-1/2 -translate-x-1/2"
    />
  </div>
</template>
