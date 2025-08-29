<template>
  <section class="work-exp">
    <h2 class="mb-5">{{ $t('title.experiences') }}</h2>

    <div
      v-for="(co, i) in companies"
      :key="co.id ?? `${co.company}-${i}`"
      class="row gx-4 gy-5 mb-5"
    >
      <div class="company-card mb-0 d-flex">
        <div v-if="co.logo" class="company-logo me-3">
          <a v-if="co.link" :href="co.link" target="_blank" rel="noopener noreferrer">
            <img :src="co.logo" alt="Company Logo" />
          </a>
        </div>
        <div class="company-info">
          <h3 class="">{{ co.company }}</h3>
          <div v-if="co.team" class="text-muted small mb-1">{{ co.team }}</div>
          <div class="fw-semibold">{{ co.role }}</div>
          <div class="text-muted small">{{ co.period }}</div>
        </div>
      </div>

      <div>
        <div
          v-for="(prj, j) in co.projects"
          :key="prj.id ?? `${prj.title}-${j}`"
          class="project-card mb-4"
        >
          <h4 class="mb-2">
            <NuxtLink
              v-if="prj.slug && prj.slug !== ''"
              :to="localePath(`/projects/${prj.slug}`)"
              target="_blank"
              rel="noopener noreferrer"
              class="text-decoration-none text-dark project-link"
            >
              {{ prj.title }}
            </NuxtLink>
            <span v-else>
              {{ prj.title }}
            </span>
          </h4>

          <div v-if="prj.subtitle" class="text-primary mb-2 fw-semibold">
            {{ prj.subtitle }}
          </div>
          <div v-if="prj.period" class="mb-2 fw-semibold">
            {{ prj.period }}
          </div>

          <div v-if="prj.duties?.length" class="mb-3">
            <div class="small fw-bold mb-1">{{ $t('labels.experience.duties') }}</div>
            <ul class="mb-0 ps-3">
              <li v-for="(r, ri) in prj.duties" :key="ri">
                <div class="fw-bold">{{ r.text }}</div>
                <ul v-if="r.sub?.length">
                  <li v-for="(s, si) in r.sub" :key="si">{{ s }}</li>
                </ul>
              </li>
            </ul>
          </div>

          <div v-if="prj.achievements?.length" class="mb-3">
            <div class="small fw-bold mb-1">{{ $t('labels.experience.achievements') }}</div>
            <ul class="mb-0 ps-3">
              <li v-for="(a, ai) in prj.achievements" :key="ai">{{ a }}</li>
            </ul>
          </div>

          <div v-if="prj.stacks?.length" class="d-flex flex-wrap gap-2 mt-2">
            <span v-for="(t, ti) in prj.stacks" :key="ti" class="badge rounded-pill bg-light text-dark border">
              {{ t }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type Duty = { text: string; sub?: string[] }
type Project = {
  id?: string
  title: string
  subtitle?: string
  period?: string
  slug?: string
  duties?: Duty[]
  achievements?: string[]
  stacks?: string[]
}
type Company = {
  id?: string
  company: string
  logo?: string
  link?: string
  team?: string
  role: string
  period: string
  projects: Project[]
}

const { t, tm } = useI18n()
const localePath = useLocalePath()       

const companies = computed<Company[]>(() => {
  const raw = tm('experience.list') as unknown
  if (!Array.isArray(raw)) return []

  return raw.map((_, i) => {
    const mapArr = (path: string) => {
      const v = tm(path) as unknown
      return Array.isArray(v) ? v.map((__, idx) => t(`${path}[${idx}]`)) : []
    }
    const mapDutys = (path: string) => {
      const v = tm(path) as unknown
      if (!Array.isArray(v)) return []
      return v.map((__, idx) => {
        const text = t(`${path}[${idx}].text`)
        const sub = mapArr(`${path}[${idx}].sub`)
        return { text, sub: sub.length ? sub : undefined }
      })
    }

    const projectsRaw = tm(`experience.list[${i}].projects`) as unknown
    const projects = Array.isArray(projectsRaw)
      ? projectsRaw.map((__, j) => ({
          title: t(`experience.list[${i}].projects[${j}].title`),
          subtitle: t(`experience.list[${i}].projects[${j}].subtitle`),
          period: t(`experience.list[${i}].projects[${j}].period`),
          slug: t(`experience.list[${i}].projects[${j}].slug`),
          duties: mapDutys(`experience.list[${i}].projects[${j}].duties`),
          achievements: mapArr(`experience.list[${i}].projects[${j}].achievements`),
          stacks: mapArr(`experience.list[${i}].projects[${j}].stacks`)
        }))
      : []

    return {
      id: `${i + 1}`,
      company: t(`experience.list[${i}].company`),
      logo: t(`experience.list[${i}].logo`),
      link: t(`experience.list[${i}].link`),
      team: t(`experience.list[${i}].team`),
      role: t(`experience.list[${i}].role`),
      period: t(`experience.list[${i}].period`),
      projects
    }
  })
})
</script>

<style scoped>
.work-exp :is(h2,h3,h4){ line-height:1.3; }

.company-card {
  display: flex;
  align-items: stretch;
  border: 1px solid #ddd;
  height: 150px;
}
.company-logo { flex: 0 0 auto; height: 100%; }
.company-logo img {
  height: 100%;
  width: auto;
  object-fit: contain;
  display: block;
}
.company-info { flex: 1; padding: 0.5rem 0; }
.project-card{
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 16px 18px;
  background: #fff;
}
.badge{ font-weight: 500; }

.project-link { transition: all 0.2s ease-in-out; }
.project-link:hover {
  color: var(--color-primary-hover) !important;
  text-decoration: underline !important;
}

@media (max-width: 767.98px){
  .company-card{ position: static; }
}
</style>
