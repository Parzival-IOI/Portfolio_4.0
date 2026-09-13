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
      <UIcon
        :name="tech.icon"
        class="size-5 shrink-0"
        :style="{ color: tech.color }"
      />
      <span class="text-sm font-medium text-default">{{ tech.name }}</span>
    </div>
  </UMarquee>
</template>
