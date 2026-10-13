import type { BadgeProps } from '@nuxt/ui'
import type { IssueStatus } from '~~/types/devtrack'

type IssueStatusMeta = {
  value: IssueStatus
  label: string
  icon: string
  color: NonNullable<BadgeProps['color']>
  textClass: string
}

export const issueStatuses: IssueStatusMeta[] = [
  { value: 'open', label: 'Open', icon: 'i-lucide-circle-dot', color: 'info', textClass: 'text-info' },
  { value: 'in_progress', label: 'In Progress', icon: 'i-lucide-circle-dashed', color: 'warning', textClass: 'text-warning' },
  { value: 'closed', label: 'Closed', icon: 'i-lucide-circle-check', color: 'success', textClass: 'text-success' }
]

export function getIssueStatus(status: IssueStatus): IssueStatusMeta {
  return issueStatuses.find(item => item.value === status) ?? issueStatuses[0]!
}
