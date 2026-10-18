<script setup lang="ts">
import type { Issue } from '~~/types/devtrack'

const route = useRoute()
const projectId = computed(() => String(route.params.id))

const {
  data: project,
  status: projectStatus,
  error: projectError,
  refresh: refreshProject
} = useLazyAsyncData(() => `project:${projectId.value}`, () => $fetch(`/api/projects/${projectId.value}`))

const {
  data: issues,
  status: issuesStatus,
  error: issuesError,
  refresh: refreshIssues
} = useLazyAsyncData(() => `project-issues:${projectId.value}`, () => $fetch(`/api/projects/${projectId.value}/issues`), {
  default: () => []
})

useHead({ title: () => `${project.value?.name ?? 'Project'} · DevTrack` })

const isProjectLoading = computed(() => projectStatus.value === 'pending' && !project.value)
const isNotFound = computed(() => projectError.value?.statusCode === 404)

const isCreateIssueOpen = ref(false)
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
  <UDashboardPanel id="project">
    <template #header>
      <UDashboardNavbar>
        <template #title>
          <UBreadcrumb
            :items="[
              { label: 'Projects', icon: 'i-lucide-folder-kanban', to: '/projects' },
              { label: project?.name ?? (isNotFound ? 'Not found' : '…') }
            ]"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <AppErrorState
          v-if="projectError && !isNotFound"
          title="Could not load project"
          :error="projectError"
          @retry="refreshProject()"
        />

        <UEmpty
          v-else-if="isNotFound"
          icon="i-lucide-folder-x"
          title="Project not found"
          description="This project does not exist or has been deleted."
          variant="outline"
          :actions="[{ label: 'Back to projects', icon: 'i-lucide-arrow-left', color: 'neutral', variant: 'outline', to: '/projects' }]"
          class="py-16"
        />

        <template v-else>
          <div v-if="isProjectLoading" class="space-y-2.5">
            <USkeleton class="h-7 w-56" />
            <USkeleton class="h-4 w-96 max-w-full" />
            <USkeleton class="h-3.5 w-32" />
          </div>

          <AppPageHeader v-else-if="project" :title="project.name" :description="project.description ?? undefined">
            <p v-if="project.created_at" class="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <UIcon name="i-lucide-calendar" class="size-3.5" />
              Created {{ formatDate(project.created_at) }}
            </p>
            <template #actions>
              <UButton label="New issue" icon="i-lucide-plus" @click="isCreateIssueOpen = true" />
            </template>
          </AppPageHeader>

          <section class="flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-medium text-highlighted">
                Issues
              </h2>
              <span v-if="issues.length" class="text-xs tabular-nums text-muted">{{ issues.length }} total</span>
            </div>

            <AppErrorState
              v-if="issuesError"
              title="Could not load issues"
              :error="issuesError"
              @retry="refreshIssues()"
            />
            <IssueTable
              v-else
              :issues="issues"
              :loading="issuesStatus === 'pending'"
              @select="openIssue"
            />
          </section>
        </template>
      </div>

      <CreateIssueModal
        v-model:open="isCreateIssueOpen"
        :project-id="projectId"
        @created="refreshIssues()"
      />

      <IssueDetailsSlideover
        v-model:open="isDetailsOpen"
        :issue="selectedIssue"
        :project-name="project?.name"
        @updated="onIssueUpdated"
      />
    </template>
  </UDashboardPanel>
</template>
