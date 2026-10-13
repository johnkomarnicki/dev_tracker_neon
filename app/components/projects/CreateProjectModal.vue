<script setup lang="ts">
import type { FormError } from "@nuxt/ui";

const open = defineModel<boolean>("open", { default: false });
const emit = defineEmits<{ created: [] }>();

const toast = useToast();
const submitting = ref(false);
const state = reactive({ name: "", description: "" });

watch(open, (isOpen) => {
  if (isOpen) Object.assign(state, { name: "", description: "" });
});

function validate(values: typeof state): FormError[] {
  return values.name.trim() ? [] : [{ name: "name", message: "Project name is required" }];
}

async function onSubmit() {
  submitting.value = true;
  try {
    const project = await $fetch("/api/projects", {
      method: "POST",
      body: {
        name: state.name,
        description: state.description,
      },
    });
    toast.add({
      title: "Project created",
      description: `${project.name} is ready for issues.`,
      icon: "i-lucide-circle-check",
      color: "success",
    });
    emit("created");
    open.value = false;
  } catch (error) {
    toast.add({
      title: "Could not create project",
      description: getErrorMessage(error),
      icon: "i-lucide-circle-alert",
      color: "error",
    });
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="New project"
    description="Projects group related issues so your team can track them together."
    :dismissible="!submitting"
  >
    <template #body>
      <UForm id="create-project-form" :state="state" :validate="validate" class="space-y-4" @submit="onSubmit">
        <UFormField label="Project name" name="name" required>
          <UInput v-model="state.name" placeholder="e.g. Billing Service" autofocus class="w-full" />
        </UFormField>
        <UFormField label="Description" name="description">
          <UTextarea
            v-model="state.description"
            placeholder="What is this project about?"
            :rows="3"
            autoresize
            class="w-full"
          />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <div class="flex w-full justify-end gap-2">
        <UButton label="Cancel" color="neutral" variant="ghost" :disabled="submitting" @click="open = false" />
        <UButton label="Create project" type="submit" form="create-project-form" :loading="submitting" />
      </div>
    </template>
  </UModal>
</template>
