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
 */
import { seedIssues, seedProjects } from '~/data/seed'
import type {
  CreateProjectInput,
  Issue,
  IssueAttachment,
  Project
} from '~~/types/devtrack'

const MOCK_LATENCY_MS = 350

const db = {
  projects: structuredClone(seedProjects),
  issues: structuredClone(seedIssues)
}

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

// ─── Projects ────────────────────────────────────────────────────────────────

export async function createProject(input: CreateProjectInput): Promise<Project> {
  await simulateLatency()
  const project: Project = {
    id: createId('prj'),
    name: input.name,
    description: input.description,
    created_at: new Date().toISOString()
  }
  db.projects.push(project)
  return clone(project)
}

// ─── Issues ──────────────────────────────────────────────────────────────────

export async function getIssue(id: string): Promise<Issue | null> {
  await simulateLatency()
  const issue = db.issues.find(issue => issue.id === id)
  return issue ? clone(issue) : null
}

// ─── Attachments ─────────────────────────────────────────────────────────────

/**
 * Mock upload: keeps the file metadata and creates a temporary object URL for
 * previewing during this browser session. Nothing is stored anywhere.
 */
export async function uploadIssueAttachment(file: File): Promise<IssueAttachment> {
  await simulateLatency(600)
  return {
    name: file.name,
    type: file.type,
    size: file.size,
    url: URL.createObjectURL(file)
  }
}
