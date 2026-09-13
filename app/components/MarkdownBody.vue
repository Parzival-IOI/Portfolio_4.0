<script setup lang="ts">
import { marked } from 'marked'

const props = defineProps<{ source: string }>()

/**
 * Post bodies are Markdown authored directly through the NestBackend API.
 * Rendering is synchronous so it works identically during SSR and on the client.
 */
const html = computed(() => marked.parse(props.source ?? '', { async: false }) as string)
</script>

<template>
  <!-- eslint-disable vue/no-v-html -- bodies are Markdown authored via the NestBackend API -->
  <div
    class="markdown-body text-default"
    v-html="html"
  />
  <!-- eslint-enable vue/no-v-html -->
</template>
