<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const links = computed<NavigationMenuItem[]>(() => [
  { label: 'Projects', icon: 'i-lucide-folder-kanban', to: '/projects', active: route.path.startsWith('/projects') },
  { label: 'Issues', icon: 'i-lucide-list-todo', to: '/issues', active: route.path.startsWith('/issues') }
])
</script>

<template>
  <UDashboardSidebar
    :default-size="15"
    :min-size="15"
    :ui="{ root: 'bg-muted/40', footer: 'border-t border-default py-3' }"
  >
    <template #header>
      <AppLogo />
    </template>

    <UNavigationMenu :items="links" orientation="vertical" />

    <template #footer>
      <!-- Placeholder user. Authentication (Neon Auth) comes in a later tutorial. -->
      <UUser
        name="Alex Morgan"
        description="alex@example.com"
        :avatar="{ text: 'AM', class: 'bg-primary/10 text-primary' }"
        size="sm"
        class="min-w-0 flex-1"
      />
      <UColorModeButton color="neutral" variant="ghost" size="sm" />
    </template>
  </UDashboardSidebar>
</template>
