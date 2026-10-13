<script setup lang="ts">
import type { FormError } from '@nuxt/ui'
import { createIssue, uploadIssueAttachment } from '~/services/devtrack'
import type { Issue, IssueAttachment, IssueStatus } from '~~/types/devtrack'

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const MAX_SCREENSHOT_SIZE = 5 * 1024 * 1024

const props = defineProps<{ projectId: string }>()
const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ created: [issue: Issue] }>()

const toast = useToast()

type FormState = {
  title: string
  description: string
  status: IssueStatus
  screenshot: File | null
}

const state = reactive<FormState>({ title: '', description: '', status: 'open', screenshot: null })
const phase = ref<'idle' | 'uploading' | 'saving'>('idle')
const submitting = computed(() => phase.value !== 'idle')

const statusItems = issueStatuses.map(({ value, label, icon }) => ({ value, label, icon }))
const statusIcon = computed(() => getIssueStatus(state.status).icon)

const submitLabel = computed(() => ({
  idle: 'Create issue',
  uploading: 'Uploading screenshot…',
  saving: 'Creating issue…'
})[phase.value])

watch(open, (isOpen) => {
  if (isOpen) Object.assign(state, { title: '', description: '', status: 'open', screenshot: null })
})

function validate(values: FormState): FormError[] {
  const errors: FormError[] = []
  if (!values.title.trim()) {
    errors.push({ name: 'title', message: 'Title is required' })
  }
  if (values.screenshot && !ACCEPTED_IMAGE_TYPES.includes(values.screenshot.type)) {
    errors.push({ name: 'screenshot', message: 'Use a PNG, JPG, or WebP image' })
  } else if (values.screenshot && values.screenshot.size > MAX_SCREENSHOT_SIZE) {
    errors.push({ name: 'screenshot', message: 'Screenshots must be 5 MB or smaller' })
  }
  return errors
}

async function onSubmit() {
  try {
    let attachment: IssueAttachment | undefined

    if (state.screenshot) {
      phase.value = 'uploading'
      attachment = await uploadIssueAttachment(state.screenshot)
      toast.add({
        title: 'Screenshot attached',
        description: `${attachment.name} · ${formatFileSize(attachment.size)}`,
        icon: 'i-lucide-image'
      })
    }

    phase.value = 'saving'
    const issue = await createIssue({
      projectId: props.projectId,
      title: state.title.trim(),
      description: state.description.trim(),
      status: state.status,
      attachment
    })

    toast.add({
      title: 'Issue created',
      description: issue.title,
      icon: 'i-lucide-circle-check',
      color: 'success'
    })
    emit('created', issue)
    open.value = false
  } catch (error) {
    toast.add({
      title: 'Could not create issue',
      description: getErrorMessage(error),
      icon: 'i-lucide-circle-alert',
      color: 'error'
    })
  } finally {
    phase.value = 'idle'
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="New issue"
    description="Describe the problem and attach a screenshot if it helps."
    :dismissible="!submitting"
    :ui="{ content: 'sm:max-w-xl' }"
  >
    <template #body>
      <UForm
        id="create-issue-form"
        :state="state"
        :validate="validate"
        :disabled="submitting"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField label="Title" name="title" required>
          <UInput
            v-model="state.title"
            placeholder="e.g. Checkout button is hidden on small screens"
            autofocus
            class="w-full"
          />
        </UFormField>

        <UFormField label="Description" name="description">
          <UTextarea
            v-model="state.description"
            placeholder="Steps to reproduce, expected behavior, and what actually happens."
            :rows="4"
            autoresize
            :maxrows="8"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Status" name="status">
          <USelect
            v-model="state.status"
            :items="statusItems"
            :icon="statusIcon"
            class="w-48"
          />
        </UFormField>

        <UFormField label="Screenshot" name="screenshot" hint="Optional">
          <IssueScreenshotInput v-model="state.screenshot" />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <div class="flex w-full justify-end gap-2">
        <UButton label="Cancel" color="neutral" variant="ghost" :disabled="submitting" @click="open = false" />
        <UButton :label="submitLabel" type="submit" form="create-issue-form" :loading="submitting" />
      </div>
    </template>
  </UModal>
</template>
