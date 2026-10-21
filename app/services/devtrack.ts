/**
 * DevTrack data layer.
 *
 * Every read and write in the app goes through this file. For now it is a mock
 * backend that keeps everything in browser memory, so refreshing the page resets
 * the app to the seed data.
 *
 * Planned replacements:
 * - Projects and issues      → Neon Postgres
 * - uploadIssueAttachment()  → Neon Object Storage
 * - getProjectStats()        → Neon Function
 */
import { seedIssues, seedProjects } from '~/data/seed'
import type {
  CreateIssueInput,
  CreateProjectInput,
  Issue,
  IssueAttachment,
  IssueStatus,
  Project,
  ProjectStats
} from '~~/types/devtrack'

const MOCK_LATENCY_MS = 350

const db = {
  projects: structuredClone(seedProjects),
  issues: structuredClone(seedIssues)
}

// Mock object storage: maps an uploaded attachment key to its temporary preview URL.
const attachmentUrls = new Map<string, string>()

function simulateLatency(ms = MOCK_LATENCY_MS) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Return copies so callers can never mutate the store directly, just like a network response.
function clone<T>(value: T): T {
  return structuredClone(value)
}

function createId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`
}

function newestFirst(a: { created_at: string | null }, b: { created_at: string | null }) {
  return (b.created_at ?? '').localeCompare(a.created_at ?? '')
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function getProjects(): Promise<Project[]> {
  await simulateLatency()
  return clone([...db.projects].sort(newestFirst))
}

export async function getProject(id: string): Promise<Project | null> {
  await simulateLatency()
  const project = db.projects.find(project => project.id === id)
  return project ? clone(project) : null
}

export async function createProject(input: CreateProjectInput): Promise<Project> {
  await simulateLatency()
  const project: Project = {
    id: createId('prj'),
    name: input.name,
    description: input.description || null,
    created_at: new Date().toISOString()
  }
  db.projects.push(project)
  return clone(project)
}

// ─── Issues ──────────────────────────────────────────────────────────────────

export async function getIssues(): Promise<Issue[]> {
  await simulateLatency()
  return clone([...db.issues].sort(newestFirst))
}

export async function getIssuesByProject(projectId: string): Promise<Issue[]> {
  await simulateLatency()
  return clone(db.issues.filter(issue => issue.project_id === projectId).sort(newestFirst))
}

export async function getIssue(id: string): Promise<Issue | null> {
  await simulateLatency()
  const issue = db.issues.find(issue => issue.id === id)
  return issue ? clone(issue) : null
}

export async function createIssue(projectId: string, input: CreateIssueInput): Promise<Issue> {
  await simulateLatency()
  if (!db.projects.some(project => project.id === projectId)) {
    throw new Error('Project not found')
  }
  const issue: Issue = {
    id: createId('iss'),
    project_id: projectId,
    title: input.title,
    description: input.description || null,
    status: input.status,
    attachment_key: input.attachment_key ?? null,
    attachment_name: input.attachment_name ?? null,
    attachment_type: input.attachment_type ?? null,
    attachment_url: input.attachment_key ? attachmentUrls.get(input.attachment_key) ?? null : null,
    created_at: new Date().toISOString()
  }
  db.issues.push(issue)
  return clone(issue)
}

export async function updateIssueStatus(id: string, status: IssueStatus): Promise<Issue> {
  await simulateLatency()
  const issue = db.issues.find(issue => issue.id === id)
  if (!issue) {
    throw new Error('Issue not found')
  }
  issue.status = status
  return clone(issue)
}

// ─── Attachments ─────────────────────────────────────────────────────────────

/**
 * Mock upload: keeps the file metadata and creates a temporary object URL for
 * previewing during this browser session. Nothing is stored anywhere.
 */
export async function uploadIssueAttachment(file: File): Promise<IssueAttachment> {
  await simulateLatency(600)
  const key = `uploads/${crypto.randomUUID()}-${file.name}`
  const url = URL.createObjectURL(file)
  attachmentUrls.set(key, url)
  return {
    key,
    name: file.name,
    type: file.type,
    size: file.size,
    url
  }
}

// ─── Stats ───────────────────────────────────────────────────────────────────

export async function getProjectStats(projectId: string): Promise<ProjectStats> {
  await simulateLatency()
  const issues = db.issues.filter(issue => issue.project_id === projectId)
  return {
    total: issues.length,
    open: issues.filter(issue => issue.status === 'open').length,
    inProgress: issues.filter(issue => issue.status === 'in_progress').length,
    closed: issues.filter(issue => issue.status === 'closed').length
  }
}
