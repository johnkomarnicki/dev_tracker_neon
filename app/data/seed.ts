import type { Issue, Project } from '~~/types/devtrack'

export const seedProjects: Project[] = [
  {
    id: 'prj_website',
    name: 'Website Redesign',
    description: 'Refresh the marketing site with the new brand, pricing, and navigation.',
    created_at: '2026-08-18T09:30:00.000Z'
  },
  {
    id: 'prj_mobile',
    name: 'Mobile App',
    description: 'iOS and Android apps for managing projects on the go.',
    created_at: '2026-07-02T14:10:00.000Z'
  },
  {
    id: 'prj_portal',
    name: 'Developer Portal',
    description: 'Public API reference, guides, and SDK documentation.',
    created_at: '2026-06-11T16:45:00.000Z'
  }
]

export const seedIssues: Issue[] = [
  // Website Redesign
  {
    id: 'iss_101',
    projectId: 'prj_website',
    title: 'Mobile navigation overlaps content',
    description: 'The navigation drawer overlaps the page content on smaller iPhone screen sizes.',
    status: 'open',
    attachment: {
      name: 'mobile-nav-overlap.svg',
      type: 'image/svg+xml',
      size: 2714,
      url: '/seed/mobile-nav-overlap.svg'
    },
    createdAt: '2026-09-24T10:12:00.000Z'
  },
  {
    id: 'iss_102',
    projectId: 'prj_website',
    title: 'Dashboard loading state flashes',
    description: 'The empty state briefly appears before project data has finished loading.',
    status: 'in_progress',
    createdAt: '2026-09-21T15:40:00.000Z'
  },
  {
    id: 'iss_103',
    projectId: 'prj_website',
    title: 'Add empty state to projects page',
    description: 'New workspaces see a blank page. Show a short explanation and a clear "New project" action instead.',
    status: 'open',
    createdAt: '2026-09-17T08:05:00.000Z'
  },
  {
    id: 'iss_104',
    projectId: 'prj_website',
    title: 'Improve keyboard navigation',
    description: 'Focus rings are missing on the header links and the pricing toggle cannot be reached with Tab.',
    status: 'closed',
    createdAt: '2026-09-09T13:22:00.000Z'
  },
  {
    id: 'iss_105',
    projectId: 'prj_website',
    title: 'Update pricing page copy',
    description: 'Replace the old enterprise messaging with the approved product copy.',
    status: 'closed',
    createdAt: '2026-08-28T11:00:00.000Z'
  },

  // Mobile App
  {
    id: 'iss_201',
    projectId: 'prj_mobile',
    title: 'Push notification deep links open the home screen',
    description: 'Tapping an issue notification should open that issue, but the app always lands on the home screen.',
    status: 'open',
    createdAt: '2026-09-26T09:18:00.000Z'
  },
  {
    id: 'iss_202',
    projectId: 'prj_mobile',
    title: 'Crash when attaching photos on Android 14',
    description: 'The app closes immediately after choosing a photo from the system picker on Pixel devices.',
    status: 'in_progress',
    createdAt: '2026-09-19T17:32:00.000Z'
  },
  {
    id: 'iss_203',
    projectId: 'prj_mobile',
    title: 'Offline banner stays visible after reconnecting',
    description: 'The "You are offline" banner does not dismiss until the app is restarted.',
    status: 'open',
    createdAt: '2026-09-12T12:47:00.000Z'
  },
  {
    id: 'iss_204',
    projectId: 'prj_mobile',
    title: 'Low contrast text on the settings screen',
    description: 'Secondary labels fail WCAG AA contrast in dark mode.',
    status: 'closed',
    createdAt: '2026-08-30T10:03:00.000Z'
  },

  // Developer Portal
  {
    id: 'iss_301',
    projectId: 'prj_portal',
    title: 'Fix API error message formatting',
    description: 'Error responses in the API reference render as a single unformatted line of JSON.',
    status: 'open',
    createdAt: '2026-09-25T14:55:00.000Z'
  },
  {
    id: 'iss_302',
    projectId: 'prj_portal',
    title: 'Document rate limit headers',
    description: 'Add a section covering X-RateLimit-Limit, X-RateLimit-Remaining, and Retry-After.',
    status: 'in_progress',
    createdAt: '2026-09-15T09:40:00.000Z'
  },
  {
    id: 'iss_303',
    projectId: 'prj_portal',
    title: 'Add copy button to code samples',
    description: 'Every code block in the guides should have a one-click copy button.',
    status: 'closed',
    createdAt: '2026-08-22T16:20:00.000Z'
  }
]
