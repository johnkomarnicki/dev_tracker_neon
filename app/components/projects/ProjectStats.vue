<script setup lang="ts">
import type { ProjectStats } from '~~/types/devtrack'

const props = defineProps<{
  stats?: ProjectStats | null
  loading?: boolean
}>()

const cards = computed(() => [
  { label: 'Total Issues', value: props.stats?.total, icon: 'i-lucide-layers', iconClass: 'text-muted' },
  { label: 'Open', value: props.stats?.open, icon: getIssueStatus('open').icon, iconClass: getIssueStatus('open').textClass },
  { label: 'In Progress', value: props.stats?.inProgress, icon: getIssueStatus('in_progress').icon, iconClass: getIssueStatus('in_progress').textClass },
  { label: 'Closed', value: props.stats?.closed, icon: getIssueStatus('closed').icon, iconClass: getIssueStatus('closed').textClass }
])
</script>

<template>
  <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <div
      v-for="card in cards"
      :key="card.label"
      class="rounded-lg border border-default bg-default px-4 py-3.5"
    >
      <div class="flex items-center justify-between text-sm text-muted">
        <span>{{ card.label }}</span>
        <UIcon :name="card.icon" class="size-4" :class="card.iconClass" />
      </div>
      <USkeleton v-if="loading && card.value === undefined" class="mt-2.5 h-7 w-10" />
      <p v-else class="mt-1.5 text-2xl font-semibold tabular-nums text-highlighted">
        {{ card.value ?? '—' }}
      </p>
    </div>
  </div>
</template>
