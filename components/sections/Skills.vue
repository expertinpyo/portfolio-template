<template>
  <section class="my-auto">
    <h2 class="mb-4">{{ t('title.skills') || 'Skills' }}</h2>

    <div v-for="g in orderedGroups" :key="g.key" class="mb-4">
      <div class="subheading mb-2">{{ groupLabel(g.key) }}</div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3">
        <div v-for="s in g.items" :key="s.name" class="col">
          <div class="card h-100 shadow-sm skill-card">
            <div class="card-body d-flex">
              <i :class="['fs-2 me-3', s.icon]"></i>
              <div class="flex-grow-1">
                <h5 class="card-title mb-1">{{ s.name }}</h5>
                <ul class="mb-0">
                  <li v-for="(d, i) in s.desc" :key="i">{{ d }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="subheading mt-4 mb-2">{{ t('labels.skills.languages') || 'Languages' }}</div>
    <div class="row row-cols-1 row-cols-md-3 g-3">
      <div v-for="(L, i) in languages" :key="L.name + i" class="col">
        <div class="card h-100 shadow-sm lang-card text-center p-3">
          <div class="flag-wrap mb-2">
            <span :class="['fi', 'fi-' + ccLower(L.country)]"></span>
          </div>
          <div class="fw-semibold">{{ L.name }}</div>
          <div class="mt-1">
            <span class="badge bg-primary">{{ L.level }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type Skill = {
  group: 'first' | 'second'
  name: string
  desc: string[]
  icon: string
}
type Language = {
  name: string
  level: string
  country?: string
}

const { t, tm } = useI18n()

const skills = computed<Skill[]>(() => {
  const raw = tm('skills.list') as unknown
  if (!Array.isArray(raw)) return []
  const mapArr = (path: string): string[] => {
    const v = tm(path) as unknown
    return Array.isArray(v) ? v.map((__, idx) => t(`${path}[${idx}]`)) : []
  }
  return raw.map((_, i) => ({
    group: t(`skills.list[${i}].group`) as Skill['group'],
    name: t(`skills.list[${i}].name`),
    desc: mapArr(`skills.list[${i}].desc`),
    icon: t(`skills.list[${i}].icon`),
  }))
})

const orderedGroups = computed(() => {
  const order: Skill['group'][] = ['first', 'second']
  return order
    .map(key => ({ key, items: skills.value.filter(s => s.group === key) }))
    .filter(g => g.items.length)
})

const languages = computed<Language[]>(() => {
  const raw = tm('skills.languages') as unknown
  if (!Array.isArray(raw)) return []
  return raw.map((_, i) => ({
    name: t(`skills.languages[${i}].name`),
    level: t(`skills.languages[${i}].level`),
    country: t(`skills.languages[${i}].country`),
  }))
})

function groupLabel(g: Skill['group']) {
  return t(`labels.skills.group.${g}`, g)
}

function ccLower(cc?: string) {
  if (!cc) return 'xx'
  let c = cc.trim().toLowerCase()
  if (c === 'uk') c = 'gb'
  if (c === 'en') c = 'gb'
  c = c.replace(/[^a-z]/g, '').slice(0, 2)
  return c || 'xx'
}
</script>

<style scoped>
.subheading { font-weight: 600; }

/* 스킬 카드: 불릿 커스텀 */
/* ✅ ul 태그의 padding-left를 0으로 초기화 */
.skill-card ul { list-style: none; margin: 0; padding-left: 0; }
.skill-card li {
  position: relative;
  /* ✅ li 태그에 좌측 패딩을 추가하여 들여쓰기 효과 */
  padding-left: 16px;
  margin: .25rem 0;
}
.skill-card li::before{
  content:"";
  position:absolute; left:0; top:.6em;
  width:6px; height:6px; border-radius:50%;
  background:#6c757d; opacity:.9;
}

.lang-card .flag-wrap{
  display:flex;
  justify-content:center;
  align-items:center;
  line-height:0;
}
.lang-card .flag-wrap .fi{
  display:block;
  width:28px; height:20px;
  border-radius:3px;
  box-shadow:0 0 0 1px rgba(0,0,0,.08) inset;
}
</style>