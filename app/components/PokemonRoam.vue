<script setup lang="ts">
import { site } from '~/config/site'

// Altaria is the only one of the six that's a flying type, so she's the only
// one who gets to roam loose across the whole viewport - see site.pokemon for
// where the other five are planted.
const style = ref<Record<string, string>>({})

// The random path only makes sense client-side - computed in onMounted
// (rather than at module scope) so SSR output has none of this, and the
// client fills it in after hydration with no mismatch to reconcile.
onMounted(() => {
  const point = () => `${4 + Math.random() * 88}vw ${4 + Math.random() * 88}vh`
  const duration = 25 + Math.random() * 20

  style.value = {
    '--p0': point(),
    '--p1': point(),
    '--p2': point(),
    '--p3': point(),
    'animation-duration': `${duration}s`
  }
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    aria-hidden="true"
  >
    <img
      v-if="Object.keys(style).length"
      :src="site.pokemon.altaria"
      :style="style"
      class="roaming-sprite absolute top-0 left-0 size-10 object-contain drop-shadow-md sm:size-14"
    >
  </div>
</template>

<style scoped>
.roaming-sprite {
  animation-name: roam;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

@keyframes roam {
  0% {
    translate: var(--p0);
  }
  25% {
    translate: var(--p1);
  }
  50% {
    translate: var(--p2);
  }
  75% {
    translate: var(--p3);
  }
  100% {
    translate: var(--p0);
  }
}
</style>
