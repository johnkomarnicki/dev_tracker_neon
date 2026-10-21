<script setup lang="ts">
import { getProjects } from "~/services/devtrack";

useHead({ title: "Projects · DevTrack" });

const isCreateOpen = ref(false);

const {
  data: projects,
  status,
  error,
  refresh,
} = useLazyAsyncData("projects", () => getProjects());

const isInitialLoad = computed(() => status.value === "pending" && !projects.value);
</script>

<template>
  <UDashboardPanel id="projects">
    <template #header>
      <UDashboardNavbar title="Projects" icon="i-lucide-folder-kanban" />
    </template>

    <template #body>
      <div class="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <AppPageHeader title="Projects" description="Manage the projects your team is working on.">
          <template #actions>
            <UButton label="New project" icon="i-lucide-plus" @click="isCreateOpen = true" />
          </template>
        </AppPageHeader>

        <AppErrorState v-if="error" title="Could not load projects" :error="error" @retry="refresh()" />

        <div v-else-if="isInitialLoad" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <ProjectCardSkeleton v-for="n in 3" :key="n" />
        </div>

        <UEmpty
          v-else-if="!projects?.length"
          icon="i-lucide-folder-plus"
          title="No projects yet"
          description="Create your first project to start tracking issues."
          variant="outline"
          :actions="[
            {
              label: 'New project',
              icon: 'i-lucide-plus',
              onClick: () => {
                isCreateOpen = true;
              },
            },
          ]"
          class="py-16"
        />

        <div v-else class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
        </div>
      </div>

      <CreateProjectModal v-model:open="isCreateOpen" @created="refresh()" />
    </template>
  </UDashboardPanel>
</template>
