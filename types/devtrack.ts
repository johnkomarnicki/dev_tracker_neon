export type Project = {
  id: string
  name: string
  description: string | null
  created_at: string | null
}

export type IssueStatus = 'open' | 'in_progress' | 'closed'

export type IssueAttachment = {
  name: string
  type: string
  size: number
  url?: string
}

export type Issue = {
  id: string
  projectId: string
  title: string
  description: string
  status: IssueStatus
  attachment?: IssueAttachment
  createdAt: string
}

export type ProjectStats = {
  total: number
  open: number
  inProgress: number
  closed: number
}

export type CreateProjectInput = {
  name: string
  description: string
}

export type CreateIssueInput = {
  projectId: string
  title: string
  description: string
  status: IssueStatus
  attachment?: IssueAttachment
}
