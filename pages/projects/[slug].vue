<template>
  <div class="page-container">
    <div class="content-wrapper">
      <aside class="toc-sidebar">
        <div class="toc-sticky-container">
          <h3>{{ $t('labels.markdown.index') }}</h3>
          <ul v-if="page && page.body && page.body.toc && page.body.toc.links.length">
            <li v-for="link in page.body.toc.links" :key="link.id">
              <a :href="`#${link.id}`">
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <main class="main-content">
        <article class="markdown-body">
          <ContentRenderer 
            v-if="page" 
            :key="`${locale}-${slugKey}`" 
            :value="page"/>
          <div v-else class="not-found">
            <h1>{{ $t('md.notFound') }}</h1>
            <p>{{ $t('md.notFoundDesc') }}</p>
          </div>
        </article>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withLeadingSlash } from 'ufo'
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale } = useI18n()

const slug = computed(() => {
  const p = route.params.slug
  const s = Array.isArray(p) ? p.join('/') : String(p ?? '')
  return withLeadingSlash(s)
})
const slugKey = computed(() => slug.value)


const { data: page } = await useAsyncData(
  () => `page-${locale.value}-${slug.value}`,
  async () => {
    const collection = ('project_' + locale.value) as keyof Collections
    const content = await queryCollection(collection).path(slug.value).first()

    if (!content && locale.value !== 'en') {
      return await queryCollection('project_en').path(slug.value).first()
    }
    return content
  },
  {
    watch: [locale, () => route.params.slug],
  }
)
</script>

<style scoped>
/* ==========================================================================
   1. General Layout
   ========================================================================== */

.page-container {
  background-color: var(--bg);
  color: var(--color);
  font-family: 'Open Sans', serif; /* Same font with main.css */
  padding: 4rem 1rem;
}

.content-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
}

@media (min-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr 3fr;
  }
}

/* ==========================================================================
   2. Left side, Index
   ========================================================================== */

.toc-sidebar {
  display: none;
}

@media (min-width: 1024px) {
  .toc-sidebar {
    display: block;
  }
}

.toc-sticky-container {
  position: sticky;
  top: 5rem;
  align-self: start;
  max-height: calc(100vh - 6rem);
  overflow-y: auto;
}

.toc-sticky-container h3 {
  font-family: 'Saira Extra Condensed', serif;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--color-text-primary);
  font-size: 1.35rem;
  margin-bottom: 1rem;
}

.toc-sticky-container ul {
  list-style: none;
  padding-left: 0;
  border-left: 1px solid var(--border-color);
}

.toc-sticky-container li {
  margin-bottom: 0.5rem;
}

.toc-sticky-container a {
  display: block;
  padding-left: 1rem;
  margin-left: -1px;
  border-left: 2px solid transparent;
  text-decoration: none;
  color: var(--color);
  transition: all 0.2s ease-in-out;
}

.toc-sticky-container a:hover {
  color: var(--color-primary-hover);
  border-left-color: var(--color-secondary);
}

/* ==========================================================================
   3. Right Side, Markdown
   ========================================================================== */

.main-content {
  background-color: var(--bg-secondary); 
  padding: 2rem 3rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

@media (max-width: 768px) {
  .main-content {
    padding: 1.5rem;
  }
}


.not-found {
  text-align: center;
  padding: 4rem 0;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  font-family: 'Saira Extra Condensed', serif;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-text-primary);
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}

.markdown-body :deep(h1) {
  font-size: 3.5rem;
  line-height: 1.2;
}

.markdown-body :deep(h2) {
  font-size: 2.5rem;
}

.markdown-body :deep(p) {
  line-height: 1.75;
  margin-bottom: 1.5rem;
  color: var(--color-text-third);
}

.markdown-body :deep(a) {
  color: var(--color-secondary);
  text-decoration: none;
  font-weight: 600;
}

.markdown-body :deep(a:hover) {
  color: var(--color-primary-hover);
  text-decoration: underline;
}

.markdown-body :deep(img) {
  max-width: 100%;
  border-radius: 0.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.markdown-body :deep(pre) {
  background-color: #081927;
  color: #e2e8f0;
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 2rem;
}

.markdown-body :deep(code) {
  font-family: 'Courier New', Courier, monospace;
}

.markdown-body :deep(p > code) {
  background-color: var(--border-color);
  color: var(--color-text-primary);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
}

.markdown-body :deep(blockquote) {
  margin-left: 0;
  padding: 1rem 1.5rem;
  border-left: 4px solid var(--color-primary);
  background-color: var(--bg);
  color: var(--color);
  font-style: italic;
}

.markdown-body :deep(ul), .markdown-body :deep(ol) {
  padding-left: 2rem;
  margin-bottom: 1.5rem;
}

.markdown-body :deep(li) {
  margin-bottom: 0.5rem;
}
</style>