<script setup lang="ts">
import type { Project } from "~~/types/devtrack";

defineProps<{
  project: Project;
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
  </NuxtLink>
</template>
