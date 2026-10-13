<script setup lang="ts">
import type { IssueAttachment } from '~~/types/devtrack'

const props = defineProps<{ attachment: IssueAttachment }>()

const isImage = computed(() => props.attachment.type.startsWith('image/') && !!props.attachment.url)
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-default">
    <a
      v-if="isImage"
      :href="attachment.url"
      target="_blank"
      rel="noopener"
      class="block bg-muted"
    >
      <img
        :src="attachment.url"
        :alt="attachment.name"
        class="max-h-80 w-full object-contain"
      >
    </a>
    <div v-else class="flex h-28 items-center justify-center bg-muted text-sm text-muted">
      Preview not available
    </div>

    <div class="flex items-center gap-2 border-t border-default px-3 py-2 text-xs">
      <UIcon name="i-lucide-paperclip" class="size-3.5 shrink-0 text-muted" />
      <span class="truncate font-medium text-default">{{ attachment.name }}</span>
      <span class="ms-auto shrink-0 tabular-nums text-muted">{{ formatFileSize(attachment.size) }}</span>
    </div>
  </div>
</template>
