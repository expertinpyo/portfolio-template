export default defineNuxtConfig({
  app:{
    head: {
      title: "Name - Portfolio",
      meta: [
        { name: 'description', content: 'a Portfolio of Name' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { name: 'author', content: 'Name' },
      ]    
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    'nuxt-typedjs'
  ],
  css:[
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap-icons/font/bootstrap-icons.css',
    '@fortawesome/fontawesome-free/css/all.min.css', 
    'devicon/devicon.min.css',
    'flag-icons/css/flag-icons.min.css',
    '~/assets/css/main.css'
  ],
  
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
       { code: 'en', name: 'Eng', language: 'en-US', country : 'us',files: [
        'en/labels.json',
        'en/resume.json',
      ] },
       { code: 'de', name: 'Deutsch', language: 'de-DE', country : 'de',files: [
        'de/labels.json',
        'de/resume.json',
      ] }
    ],
    // detectBrowserLanguage: {
    //   useCookie: true,
    //   cookieKey: 'i18n_redirected',
    //   redirectOn: 'no prefix',
    // }
  },
  content: {
    build: {
      markdown: {
        highlight: {
          // Theme used in all color schemes.
          // OR
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai'
          }
        }
      }
    }
  },
  nitro:{
    prerender: {
      ignore: ['/__nuxt_content/**'],
      failOnError: false,
      routes: []
    },
    routeRules: {
      '/**': {
        ssr: true,
        headers: {
          'x-robots-tag': 'noindex, nofollow, noarchive, nosnippet',
          'cache-control': 'no-store'
        }
      },
      '/__nuxt_content/**': { prerender: false }
    }
  }
})