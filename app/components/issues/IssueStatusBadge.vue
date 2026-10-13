<script setup lang="ts">
import type { IssueStatus } from '~~/types/devtrack'

const props = defineProps<{ status: IssueStatus }>()

const meta = computed(() => getIssueStatus(props.status))
</script>

<template>
  <UBadge
    :label="meta.label"
    :icon="meta.icon"
    :color="meta.color"
    variant="subtle"
    size="md"
    class="whitespace-nowrap"
  />
</template>
