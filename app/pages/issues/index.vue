<script setup lang="ts">
import { getIssues, getProjects } from '~/services/devtrack'
import type { Issue, IssueStatus } from '~~/types/devtrack'

useHead({ title: 'Issues · DevTrack' })

const {
  data: issues,
  status: issuesStatus,
  error: issuesError,
  refresh: refreshIssues
} = useLazyAsyncData('issues', () => getIssues(), { default: () => [] })

const { data: projects } = useLazyAsyncData('issue-filter-projects', () => getProjects(), { default: () => [] })

const projectNames = computed(() =>
  Object.fromEntries(projects.value.map(project => [project.id, project.name]))
)

const search = ref('')
const projectFilter = ref('all')
const statusFilter = ref<IssueStatus | 'all'>('all')

const projectItems = computed(() => [
  { label: 'All projects', value: 'all' },
  ...projects.value.map(project => ({ label: project.name, value: project.id }))
])

const statusItems = [
  { label: 'All statuses', value: 'all' as const, icon: 'i-lucide-list-filter' },
  ...issueStatuses.map(({ value, label, icon }) => ({ label, value, icon }))
]

const hasFilters = computed(() => !!search.value || projectFilter.value !== 'all' || statusFilter.value !== 'all')

const filteredIssues = computed(() => {
  const query = search.value.trim().toLowerCase()
  return issues.value.filter(issue =>
    (projectFilter.value === 'all' || issue.project_id === projectFilter.value)
    && (statusFilter.value === 'all' || issue.status === statusFilter.value)
    && (!query || issue.title.toLowerCase().includes(query))
  )
})

function clearFilters() {
  search.value = ''
  projectFilter.value = 'all'
  statusFilter.value = 'all'
}

const isDetailsOpen = ref(false)
const selectedIssue = ref<Issue | null>(null)

function openIssue(issue: Issue) {
  selectedIssue.value = issue
  isDetailsOpen.value = true
}

function onIssueUpdated(issue: Issue) {
  selectedIssue.value = issue
  refreshIssues()
}
</script>

<template>
  <UDashboardPanel id="issues">
    <template #header>
      <UDashboardNavbar title="Issues" icon="i-lucide-list-todo" />
    </template>

    <template #body>
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <AppPageHeader title="Issues" description="View and manage issues across all projects." />

        <div class="flex flex-wrap items-center gap-2">
          <UInput
            v-model="search"
            icon="i-lucide-search"
            placeholder="Search issues…"
            class="w-full sm:w-64"
          />
          <USelect v-model="projectFilter" :items="projectItems" class="w-44" aria-label="Filter by project" />
          <USelect v-model="statusFilter" :items="statusItems" class="w-40" aria-label="Filter by status" />
          <UButton
            v-if="hasFilters"
            label="Clear"
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            @click="clearFilters"
          />
          <span v-if="issues.length" class="ms-auto text-xs tabular-nums text-muted">
            {{ filteredIssues.length }} of {{ issues.length }} issues
          </span>
        </div>

        <AppErrorState
          v-if="issuesError"
          title="Could not load issues"
          :error="issuesError"
          @retry="refreshIssues()"
        />
        <IssueTable
          v-else
          :issues="filteredIssues"
          :loading="issuesStatus === 'pending' && !issues.length"
          :project-names="projectNames"
          @select="openIssue"
        />
      </div>

      <IssueDetailsSlideover
        v-model:open="isDetailsOpen"
        :issue="selectedIssue"
        :project-name="selectedIssue ? projectNames[selectedIssue.project_id] : undefined"
        @updated="onIssueUpdated"
      />
    </template>
  </UDashboardPanel>
</template>
