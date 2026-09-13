<script setup lang="ts">
import { site } from '~/config/site'
</script>

<template>
  <span class="flex items-center gap-2">
    <span
      class="grid place-items-center size-7 rounded-md bg-primary text-inverted font-bold text-sm shrink-0"
      aria-hidden="true"
    >{{ site.initials }}</span>
    <span class="font-semibold tracking-tight hidden sm:inline">{{ site.name }}</span>
  </span>
</template>
