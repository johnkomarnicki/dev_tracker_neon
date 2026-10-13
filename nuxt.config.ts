export default defineNuxtConfig({
  modules: ['@nuxt/ui'],

  // The mock data layer lives in browser memory, so the app renders client-side only.
  // Once data comes from a real backend, SSR can be turned back on.
  ssr: false,

  devtools: { enabled: true },

  app: {
    head: {
      title: 'DevTrack',
      meta: [{ name: 'description', content: 'Track issues. Ship better software.' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
    }
  },

  css: ['~/assets/css/main.css'],

  components: [{ path: '~/components', pathPrefix: false }],

  compatibilityDate: '2026-09-01'
})
