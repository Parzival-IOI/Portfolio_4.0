<script setup lang="ts">
withDefaults(defineProps<{ size?: string }>(), { size: 'size-56' })
</script>

<template>
  <div :class="[size, 'relative shrink-0']">
    <div class="pointer-events-none absolute -inset-12 rounded-full bg-primary/2 ring-2 ring-primary/5" />
    <div class="pointer-events-none absolute -inset-8 rounded-full bg-primary/5 ring-2 ring-primary/10" />
    <div class="pointer-events-none absolute -inset-4 rounded-full bg-primary/10 ring-2 ring-primary/20" />

    <div class="relative size-full overflow-hidden rounded-full ring ring-default">
      <img
        src="/me2.jpg"
        alt="Photo of me"
        class="absolute inset-0 size-full object-cover dark:hidden"
      >
      <img
        src="/me.jpeg"
        alt="Photo of me"
        class="absolute inset-0 hidden size-full object-cover dark:block"
      >
    </div>
  </div>
</template>
