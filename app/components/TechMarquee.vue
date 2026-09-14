<script setup lang="ts">
import { site } from '~/config/site'
</script>

<template>
  <UMarquee
    pause-on-hover
    :repeat="3"
    class="py-2 [--gap:--spacing(4)] [--duration:38s]"
  >
    <div
      v-for="tech in site.tech"
      :key="tech.name"
      class="flex items-center gap-2.5 rounded-lg bg-elevated/60 ring ring-default px-4 py-2.5 whitespace-nowrap"
    >
      <img
        v-if="tech.logo"
        :src="tech.logo"
        :alt="tech.name"
        class="size-5 shrink-0 rounded-sm object-cover"
      >
      <UIcon
        v-else
        :name="tech.icon"
        class="size-5 shrink-0"
        :class="!tech.color && 'text-default'"
        :style="tech.color ? { color: tech.color } : undefined"
      />
      <span class="text-sm font-medium text-default">{{ tech.name }}</span>
    </div>
  </UMarquee>
</template>
