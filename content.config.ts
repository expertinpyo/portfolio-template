import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    project_en: defineCollection({
      type: 'page',
      source: { include: 'en/**', prefix: '' }
    }), 
    project_de: defineCollection({
      type: 'page',
      source: { include: 'de/**', prefix: '' }
    }), 
  }
})
