<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  size?: string
  flip?: boolean
}>(), {
  size: 'size-12',
  flip: false
})
</script>

<template>
  <img
    :src="src"
    alt=""
    aria-hidden="true"
    :class="[size, flip && 'scale-x-[-1]', 'pointer-events-none absolute select-none object-contain drop-shadow-md']"
  >
</template>
