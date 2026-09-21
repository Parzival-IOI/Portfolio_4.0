<script setup lang="ts">
const music = useMusic()

const open = computed({
  get: () => music.promptOpen.value,
  // Closing it any way other than "Play it" (Esc, backdrop click, X) counts as "No thanks".
  set: (value: boolean) => {
    if (!value && music.promptOpen.value) music.decline()
  }
})

let cancelPrompt = () => {}
onMounted(() => {
  cancelPrompt = music.schedulePrompt()
})
onBeforeUnmount(() => cancelPrompt())
</script>

<template>
  <UModal
    v-model:open="open"
    title="Mind if I put a record on?"
    :ui="{ content: 'max-w-md' }"
  >
    <template #description>
      <span class="sr-only">Optional background music: {{ TRACK.artist }} - {{ TRACK.title }}</span>
    </template>

    <template #body>
      <div class="flex items-center gap-4">
        <span class="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UIcon
            name="i-lucide-disc-3"
            class="size-8"
          />
        </span>
        <div class="min-w-0">
          <p class="font-semibold text-highlighted">
            {{ TRACK.artist }} - {{ TRACK.title }}
          </p>
          <p class="text-sm text-muted">
            Say yes and the whole site slips into a warm, nostalgic look - fonts and words included. Say no and nothing changes.
          </p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full justify-end gap-2">
        <UButton
          label="No thanks"
          color="neutral"
          variant="ghost"
          @click="music.decline()"
        />
        <UButton
          label="Play it"
          icon="i-lucide-play"
          @click="music.accept()"
        />
      </div>
    </template>
  </UModal>
</template>
