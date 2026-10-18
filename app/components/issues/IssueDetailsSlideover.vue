<script setup lang="ts">
import type { Issue, IssueStatus } from '~~/types/devtrack'

const props = defineProps<{
  issue: Issue | null
  projectName?: string
}>()

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ updated: [issue: Issue] }>()

const toast = useToast()
const updating = ref(false)

const statusItems = issueStatuses.map(({ value, label, icon }) => ({ value, label, icon }))
const statusIcon = computed(() => props.issue ? getIssueStatus(props.issue.status).icon : undefined)

async function onStatusChange(status: IssueStatus) {
  if (!props.issue || status === props.issue.status) return

  updating.value = true
  try {
    const issue = await $fetch(`/api/issues/${props.issue.id}`, {
      method: 'PATCH',
      body: { status }
    })
    toast.add({
      title: 'Issue status updated',
      description: `Moved to ${getIssueStatus(status).label}.`,
      icon: getIssueStatus(status).icon,
      color: getIssueStatus(status).color
    })
    emit('updated', issue)
  } catch (error) {
    toast.add({
      title: 'Could not update status',
      description: getErrorMessage(error),
      icon: 'i-lucide-circle-alert',
      color: 'error'
    })
  } finally {
    updating.value = false
  }
}
</script>

<template>
  <USlideover
    v-model:open="open"
    :title="issue?.title ?? 'Issue'"
    :ui="{ content: 'sm:max-w-lg', title: 'text-lg leading-snug', body: 'space-y-6' }"
  >
    <template #description>
      <span v-if="issue" class="font-mono text-xs text-dimmed">{{ issue.id }}</span>
    </template>

    <template #body>
      <template v-if="issue">
        <dl class="grid grid-cols-[7rem_1fr] items-center gap-x-4 gap-y-3 text-sm">
          <dt class="text-muted">
            Status
          </dt>
          <dd>
            <USelect
              :model-value="issue.status"
              :items="statusItems"
              :icon="statusIcon"
              :loading="updating"
              :disabled="updating"
              size="sm"
              class="w-44"
              aria-label="Issue status"
              @update:model-value="onStatusChange"
            />
          </dd>

          <dt class="text-muted">
            Project
          </dt>
          <dd class="flex min-w-0 items-center gap-2 text-default">
            <ProjectAvatar v-if="projectName" :name="projectName" size="sm" />
            <span class="truncate">{{ projectName ?? '—' }}</span>
          </dd>

          <dt class="text-muted">
            Created
          </dt>
          <dd class="tabular-nums text-default">
            {{ issue.created_at ? formatDateTime(issue.created_at) : '—' }}
          </dd>
        </dl>

        <USeparator />

        <section>
          <h3 class="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
            Description
          </h3>
          <p v-if="issue.description" class="whitespace-pre-line text-sm leading-relaxed text-default">
            {{ issue.description }}
          </p>
          <p v-else class="text-sm text-dimmed">
            No description provided.
          </p>
        </section>

        <section>
          <h3 class="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
            Screenshot
          </h3>
          <IssueAttachment
            v-if="issue.attachment_key"
            :attachment="{ name: issue.attachment_name ?? 'Screenshot', type: issue.attachment_type ?? '', url: issue.attachment_url ?? undefined }"
          />
          <p v-else class="text-sm text-dimmed">
            No screenshot attached.
          </p>
        </section>
      </template>
    </template>
  </USlideover>
</template>
