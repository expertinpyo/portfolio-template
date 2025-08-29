<template>
  <div class="my-auto">
    <h2 class="mb-5">{{ $t('title.education') }}</h2>

    <div
      v-for="(edu, i) in eduList"
      :key="edu.id ?? `${edu.name}-${i}`"
      class="resume-item d-flex flex-column flex-md-row mb-5 gap-3 gap-md-4"
    >
      <aside class="col-12 col-md-6">
        <div class="company-card mb-3 d-flex">
          <div v-if="edu.logo" class="company-logo me-3">
            <a v-if="edu.link" :href="edu.link" target="_blank" rel="noopener noreferrer">
              <img :src="edu.logo" alt="Edu Logo" />
            </a>
          </div>

          <div class="company-info">
            <h3 class="mb-1">{{ edu.name }}</h3>
            <div class="text-muted small">{{ edu.period }}</div>
            <div class="fw-semibold">{{ edu.degree }}</div>
          </div>
        </div>
      </aside>

      <div class="col-12 col-md-6">
        <div class="project-card">
          <ul v-if="edu.desc?.length" class="mb-2 ps-3">
            <li v-for="(line, j) in edu.desc" :key="j">{{ line }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 스크립트는 변경할 필요 없습니다.
import { useI18n } from 'vue-i18n'

type Edu = {
  id?: string
  name: string
  degree: string
  period: string
  desc: string[],
  link : string,
  logo : string
}

const { t, tm } = useI18n()

const eduList = computed<Edu[]>(() => {
  const raw = tm('education.list') as unknown
  if (!Array.isArray(raw)) return []
  return raw.map((_, i) => {
    const rawDesc = tm(`education.list[${i}].desc`) as unknown
    const desc =
      Array.isArray(rawDesc)
        ? rawDesc.map((__, j) => t(`education.list[${i}].desc[${j}]`))
        : (t(`education.list[${i}].desc`) ? [t(`education.list[${i}].desc`)] : [])

    return {
      id: `${i+1}`,
      name: t(`education.list[${i}].name`),
      degree: t(`education.list[${i}].degree`),
      period: t(`education.list[${i}].period`),
      desc,
      link: t(`education.list[${i}].link`),
      logo: t(`education.list[${i}].logo`),
    }
  })
})
</script>

<style scoped>
/* ✅ h2 고정 스타일을 완전히 제거하여 원래 상태로 복원 */

.company-card {
  display: flex;
  align-items: flex-start;
  min-height: 0;
}
.company-logo{
  flex:0 0 auto;
}
.company-logo img{
  max-height:64px;
  width:auto;
  object-fit:contain;
  display:block;
}
.company-info{
  flex:1;
  padding:0;
}
.company-info h3{
  margin-top:0;
  line-height:1.2;
}
.project-card{
  border: 1px solid var(--border-color, #eaeaea);
  border-radius: 12px;
  padding: 16px 18px;
  background: var(--bg-secondary, #fff);
}
.badge{
  font-weight: 500;
}
@media (max-width: 767.98px){
  .company-card{
    position: static;
  }
}
</style>