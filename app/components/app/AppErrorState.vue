<script setup lang="ts">
defineProps<{
  title: string
  error?: unknown
}>()

defineEmits<{ retry: [] }>()
</script>

<template>
  <UAlert
    color="error"
    variant="subtle"
    icon="i-lucide-circle-alert"
    :title="title"
    :description="getErrorMessage(error)"
    :actions="[{ label: 'Try again', color: 'error', variant: 'outline', size: 'xs', onClick: () => $emit('retry') }]"
  />
</template>
