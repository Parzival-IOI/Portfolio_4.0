<script setup lang="ts">
defineProps<{ source: string }>()

/**
 * Post bodies are HTML from the dashboard's rich-text editor, sanitized
 * server-side (NestBackend strips scripts/event handlers before storing) -
 * rendered as-is, no client-side parsing step needed.
 */
</script>

<template>
  <!-- eslint-disable vue/no-v-html -- server-sanitized HTML from the NestBackend API -->
  <div
    class="post-body text-default"
    v-html="source"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>
