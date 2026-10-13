<script setup lang="ts">
const file = defineModel<File | null>({ default: null })

// Local preview while the form is open. The mock upload creates its own URL on submit.
const previewUrl = ref<string>()

watch(file, (value, _previous, onCleanup) => {
  if (!value) {
    previewUrl.value = undefined
    return
  }
  const url = URL.createObjectURL(value)
  previewUrl.value = url
  onCleanup(() => URL.revokeObjectURL(url))
}, { immediate: true })
</script>

<template>
  <UFileUpload
    v-model="file"
    accept="image/png,image/jpeg,image/webp"
    icon="i-lucide-image-up"
    label="Drop a screenshot here"
    description="or click to browse · PNG, JPG, or WebP up to 5 MB"
    layout="list"
    position="inside"
    class="w-full"
    :ui="{ base: 'min-h-32', files: 'w-full', file: 'border-0 p-0' }"
  >
    <template #file="{ file: selected, removeFile }">
      <div class="flex w-full items-center gap-4">
        <img
          v-if="previewUrl"
          :src="previewUrl"
          :alt="selected.name"
          class="h-20 w-32 shrink-0 rounded-md border border-default bg-muted object-cover"
        >
        <div class="min-w-0 flex-1 text-left">
          <p class="truncate text-sm font-medium text-highlighted">
            {{ selected.name }}
          </p>
          <p class="mt-0.5 text-xs text-muted">
            {{ formatFileSize(selected.size) }} · Click to replace
          </p>
        </div>
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="Remove screenshot"
          @click.stop.prevent="removeFile()"
        />
      </div>
    </template>
  </UFileUpload>
</template>
