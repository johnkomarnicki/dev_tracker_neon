<template>
  <UApp :toaster="{ position: 'bottom-right', duration: 4000 }">
    <NuxtLoadingIndicator color="var(--ui-primary)" :height="2" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
``
