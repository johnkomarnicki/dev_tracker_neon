<script setup lang="ts">
const props = withDefaults(defineProps<{
  name: string
  size?: 'sm' | 'md'
}>(), {
  size: 'md'
})

const initials = computed(() =>
  props.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0]!.toUpperCase())
    .join('')
)
</script>

<template>
  <span
    class="grid shrink-0 place-items-center rounded-md border border-default bg-elevated font-mono font-medium text-muted"
    :class="size === 'sm' ? 'size-6 text-[10px]' : 'size-9 text-xs'"
  >
    {{ initials }}
  </span>
</template>
