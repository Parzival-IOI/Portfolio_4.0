<script setup lang="ts">
const film = useFilmMode()

// Camera-back date imprint, e.g. SEP 21 '26.
const stamp = computed(() => {
  const now = new Date()
  const day = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()
  return `${day} '${String(now.getFullYear()).slice(-2)}`
})
</script>

<template>
  <Transition name="film-overlay">
    <div
      v-if="film"
      class="film-overlay"
      aria-hidden="true"
    >
      <div class="film-tint" />
      <div class="film-leak" />
      <div class="film-leak film-leak--top" />
      <div class="film-dust" />
      <div class="film-grain" />
      <div class="film-vignette" />
      <span class="film-stamp">{{ stamp }}</span>
    </div>
  </Transition>
</template>
