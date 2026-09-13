<script setup lang="ts">
defineProps<{
  item: {
    description?: string
    highlights?: string[]
  }
}>()
</script>

<template>
  <div>
    <p
      v-if="item.description"
      class="text-sm text-muted"
    >
      {{ item.description }}
    </p>
    <ul
      v-if="item.highlights?.length"
      class="mt-2 list-disc ps-5 space-y-1 text-sm text-muted"
    >
      <li
        v-for="highlight in item.highlights"
        :key="highlight"
      >
        {{ highlight }}
      </li>
    </ul>
  </div>
</template>
