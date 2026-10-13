<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div class="min-w-0">
      <h1 class="text-2xl font-semibold tracking-tight text-highlighted">
        {{ title }}
      </h1>
      <p v-if="description" class="mt-1 max-w-2xl text-sm text-muted">
        {{ description }}
      </p>
      <slot />
    </div>
    <div v-if="$slots.actions" class="flex shrink-0 items-center gap-2">
      <slot name="actions" />
    </div>
  </div>
</template>
