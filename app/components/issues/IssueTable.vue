<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Issue } from '~~/types/devtrack'

const props = defineProps<{
  issues: Issue[]
  loading?: boolean
  /** Pass project names to show a Project column (used on the all-issues page). */
  projectNames?: Record<string, string>
}>()

const emit = defineEmits<{ select: [issue: Issue] }>()

const columns = computed<TableColumn<Issue>[]>(() => [
  { accessorKey: 'title', header: 'Issue', meta: { class: { th: 'w-full min-w-64', td: 'max-w-0 min-w-64' } } },
  ...(props.projectNames ? [{ accessorKey: 'project_id', header: 'Project' }] : []),
  { accessorKey: 'status', header: 'Status' },
  { id: 'attachment', header: 'Attachment', meta: { class: { th: 'text-center', td: 'text-center' } } },
  { accessorKey: 'created_at', header: 'Created', meta: { class: { th: 'text-right', td: 'text-right' } } }
])
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-default bg-default">
    <div v-if="loading && !issues.length" class="divide-y divide-default">
      <div class="px-4 py-3">
        <USkeleton class="h-3.5 w-24" />
      </div>
      <div v-for="n in 4" :key="n" class="flex items-center gap-6 px-4 py-4">
        <div class="flex-1 space-y-2">
          <USkeleton class="h-4 w-1/3" />
          <USkeleton class="h-3 w-1/2" />
        </div>
        <USkeleton class="h-5 w-20" />
        <USkeleton class="h-4 w-20" />
      </div>
    </div>

    <UTable
      v-else
      :data="issues"
      :columns="columns"
      :ui="{
        thead: 'bg-muted/50',
        th: 'py-2.5 text-xs font-medium text-muted whitespace-nowrap',
        td: 'py-3',
        tbody: '[&>tr]:cursor-pointer'
      }"
      @select="(_event, row) => emit('select', row.original)"
    >
      <template #title-cell="{ row }">
        <p class="truncate font-medium text-highlighted">
          {{ row.original.title }}
        </p>
        <p v-if="row.original.description" class="mt-0.5 truncate text-xs text-muted">
          {{ row.original.description }}
        </p>
      </template>

      <template #project_id-cell="{ row }">
        <span class="flex items-center gap-2 text-default">
          <ProjectAvatar :name="projectNames?.[row.original.project_id] ?? '?'" size="sm" />
          {{ projectNames?.[row.original.project_id] ?? 'Unknown project' }}
        </span>
      </template>

      <template #status-cell="{ row }">
        <IssueStatusBadge :status="row.original.status" />
      </template>

      <template #attachment-cell="{ row }">
        <UTooltip v-if="row.original.attachment_key" :text="row.original.attachment_name ?? undefined">
          <UIcon name="i-lucide-image" class="size-4 text-muted" />
        </UTooltip>
        <span v-else class="text-dimmed">—</span>
      </template>

      <template #created_at-cell="{ row }">
        <span v-if="row.original.created_at" class="tabular-nums">{{ formatDate(row.original.created_at) }}</span>
        <span v-else class="text-dimmed">—</span>
      </template>

      <template #empty>
        <UEmpty
          icon="i-lucide-inbox"
          title="No issues found"
          description="Issues you create will show up here."
          variant="naked"
          size="sm"
        />
      </template>
    </UTable>
  </div>
</template>
