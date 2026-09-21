<script setup lang="ts">
const music = useMusic()
const { phase, muted, filmActive } = music

const label = computed(() => phase.value === 'loading' ? 'Winding the tape...' : `${TRACK.artist} - ${TRACK.title}`)
</script>

<template>
  <Transition
    enter-active-class="transition duration-500"
    enter-from-class="translate-y-4 opacity-0"
    leave-active-class="transition duration-300"
    leave-to-class="translate-y-4 opacity-0"
  >
    <div
      v-if="filmActive"
      :data-state="phase"
      role="region"
      aria-label="Music player"
      class="fixed bottom-4 left-4 z-[70] flex max-w-[calc(100vw-2rem)] items-center gap-1.5 rounded-full border border-default bg-default/90 py-1.5 pr-1.5 pl-3 shadow-lg backdrop-blur"
    >
      <UIcon
        :name="phase === 'loading' ? 'i-lucide-loader-circle' : 'i-lucide-disc-3'"
        class="size-5 shrink-0 text-primary motion-reduce:animate-none"
        :class="{
          'animate-spin': phase === 'loading',
          'animate-[spin_5s_linear_infinite]': phase === 'playing'
        }"
      />
      <span class="font-numeric max-w-40 truncate px-1 text-xs font-medium text-highlighted sm:max-w-56">
        {{ label }}
      </span>

      <UButton
        :icon="phase === 'playing' ? 'i-lucide-pause' : 'i-lucide-play'"
        :aria-label="phase === 'playing' ? 'Pause' : 'Play'"
        :disabled="phase === 'loading'"
        color="neutral"
        variant="ghost"
        size="sm"
        square
        @click="music.toggle()"
      />
      <UButton
        :icon="muted ? 'i-lucide-volume-x' : 'i-lucide-volume-2'"
        :aria-label="muted ? 'Unmute' : 'Mute'"
        :disabled="phase === 'loading'"
        color="neutral"
        variant="ghost"
        size="sm"
        square
        @click="music.toggleMute()"
      />
      <UButton
        icon="i-lucide-x"
        aria-label="Stop the music and go back to normal"
        title="Back to normal"
        color="neutral"
        variant="subtle"
        size="sm"
        square
        @click="music.stop()"
      />
    </div>
  </Transition>
</template>
