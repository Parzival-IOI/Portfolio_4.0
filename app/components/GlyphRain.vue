<script setup lang="ts">
import type { GlyphRainInstance, GlyphRainOptions } from '~/utils/glyph-rain'

// Drop this as the first child of a `relative isolate` section. It paints the
// rain behind the section's content and fades it out as the section scrolls
// away (fully gone once the section's bottom edge leaves the top of the screen).
const props = defineProps<GlyphRainOptions>()

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')

let instance: GlyphRainInstance | null = null

function updateFade() {
  const el = canvas.value
  const host = el?.parentElement
  if (!el || !host) return
  const rect = host.getBoundingClientRect()
  // 1 while the section is fully in view, easing to 0 as it scrolls off the top.
  const visibleShare = Math.min(Math.max(rect.bottom / Math.max(rect.height, 1), 0), 1)
  el.style.opacity = String(visibleShare * visibleShare)
}

onMounted(() => {
  if (!canvas.value) return
  instance = createGlyphRain(canvas.value, props)
  updateFade()
  window.addEventListener('scroll', updateFade, { passive: true })
  window.addEventListener('resize', updateFade, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateFade)
  window.removeEventListener('resize', updateFade)
  instance?.destroy()
  instance = null
})
</script>

<template>
  <!-- Bottom mask feathers the hero edge so the rain never ends on a hard line. -->
  <canvas
    ref="canvas"
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 -z-10 size-full opacity-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)]"
  />
</template>
