<script setup lang="ts">
import type { Project, ProjectStats } from "~~/types/devtrack";

defineProps<{
  project: Project;
  stats?: ProjectStats;
}>();
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.id}`"
    class="group flex flex-col rounded-lg border border-default bg-default p-5 transition-colors hover:border-accented hover:bg-elevated/40 focus-visible:outline-2 focus-visible:outline-primary"
  >
    <div class="flex items-start justify-between gap-3">
      <ProjectAvatar :name="project.name" />
      <UIcon
        name="i-lucide-arrow-up-right"
        class="size-4 text-dimmed opacity-0 transition-opacity group-hover:opacity-100"
      />
    </div>

    <h3 class="mt-4 font-medium text-highlighted">
      {{ project.name }}
    </h3>
    <p class="mt-1 line-clamp-2 flex-1 text-sm text-muted">
      {{ project.description || "No description" }}
    </p>

    <div
      v-if="stats"
      class="mt-5 flex items-center justify-between gap-3 border-t border-default pt-4 text-xs text-muted"
    >
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-layers" class="size-3.5" />
          {{ stats.total }} {{ stats.total === 1 ? "issue" : "issues" }}
        </span>
        <span class="flex items-center gap-1.5">
          <UIcon name="i-lucide-circle-dot" class="size-3.5 text-info" />
          {{ stats.open }} open
        </span>
      </div>
      <span v-if="project.created_at" class="tabular-nums">{{ formatDate(project.created_at) }}</span>
    </div>
  </NuxtLink>
</template>
