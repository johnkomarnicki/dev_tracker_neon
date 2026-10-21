# DevTrack

**Track issues. Ship better software.**

DevTrack is a small issue and feedback tracker for software teams. You can create projects, log issues with screenshots, and move issues between Open, In Progress, and Closed.

This repository is the frontend starter for a tutorial series. The UI is complete; the backend is intentionally a mock.

Built with Nuxt 4, Vue 3, TypeScript, and Nuxt UI.

## Setup

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. It redirects to `/projects`.

Other scripts:

```bash
npm run typecheck   # vue-tsc type checking
npm run build       # production build
npm run preview     # preview the production build
```

## Current Architecture

The app currently uses an **in-memory mock backend** that runs in the browser.

- **Projects and issues are not persisted.** New records exist only in memory and disappear when you refresh the page. A refresh resets everything to the seed data.
- **Attachments are only temporary browser previews.** A selected screenshot is turned into a `blob:` URL with `URL.createObjectURL()`. It is not converted to base64 or uploaded anywhere.
- **Authentication is intentionally not implemented.** The user shown in the sidebar (Alex Morgan) is a static placeholder.

Every data operation goes through one file, so the backend can be swapped without restructuring the UI:

```text
app/
  services/devtrack.ts   ← the only data-access layer (mock backend today)
  data/seed.ts           ← seed projects and issues
  types/devtrack.ts      ← domain types shared by the UI and the service
  components/            ← UI only: app shell, projects, issues
  pages/                 ← /projects, /projects/[id], /issues
```

The service exposes async functions that return Promises, like real network calls do:

| Function | Replaced by |
| --- | --- |
| `getProjects()`, `getProject(id)`, `createProject(input)` | Neon Postgres |
| `getIssues()`, `getIssuesByProject(projectId)`, `getIssue(id)`, `createIssue(input)`, `updateIssueStatus(id, status)` | Neon Postgres |
| `uploadIssueAttachment(file)` | Neon Object Storage |

Each call adds a short artificial delay so loading states are visible.

SSR is disabled in `nuxt.config.ts` because the mock data lives in browser memory. It can be turned back on once data comes from a real backend.

## Backend TODO

```text
[ ] Replace mock project and issue storage with Neon Postgres
[ ] Replace mock attachment upload with Neon Object Storage
[ ] Add Neon Auth
```
