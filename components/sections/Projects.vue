<template>
  <section class="work-exp">
    <h2 class="mb-5">{{ $t('title.projects') }}</h2>

    <div>
        
        <div
          v-for="(prj, j) in projects"
          :key="prj.id ?? `${prj.title}-${j}`"
          class="mb-5"
        >
          <div class="company-info">
            <h3 class="mb-1">{{ prj.title }}</h3>
            <div v-if="prj.subtitle" class="text-primary mb-2 fw-semibold">
              {{ prj.subtitle }}
            </div>
            <div v-if="prj.role" class="mb-2 fw-semibold">
              {{ prj.role }}
            </div>
            <div v-if="prj.period" class="mb-2 fw-semibold">
              {{ prj.period }}
            </div>
          </div>
          <div class="project-card">
            
            <!-- Details / 내용 -->
            <div v-if="prj.details?.length" class="mb-3">
              <div class="small fw-bold mb-1">{{ $t('labels.projects.details') }}</div>
              <ul class="mb-0 ps-3">
                <li v-for="(a, ai) in prj.details" :key="ai">{{ a }}</li>
              </ul>
            </div>

            <!-- Duties / 내용 -->
             <div v-if="prj.duties?.length" class="mb-3">
              <div class="small fw-bold mb-1">{{ $t('labels.projects.duties') }}</div>
              <ul class="mb-0 ps-3">
                <li v-for="(a, ai) in prj.duties" :key="ai">{{ a }}</li>
              </ul>
            </div>

            <!-- Achievements / 성과 -->
            <div v-if="prj.achievements?.length" class="mb-3">
              <div class="small fw-bold mb-1">{{ $t('labels.projects.achievements') }}</div>
              <ul class="mb-0 ps-3">
                <li v-for="(a, ai) in prj.achievements" :key="ai">{{ a }}</li>
              </ul>
            </div>

            <div v-if="prj.limitations?.length" class="mb-3">
              <div class="small fw-bold mb-1">{{ $t('labels.projects.limitations') }}</div>
              <ul class="mb-0 ps-3">
                <li v-for="(a, ai) in prj.limitations" :key="ai">{{ a }}</li>
              </ul>
            </div>

            <!-- Tech chips -->
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


type Project = {
  id?: string
  title: string
  subtitle?: string,
  period?: string,
  role?: string,
  details?: string[],
  duties?: string[],
  limitations?: string[],
  achievements?: string[]
  stacks?: string[]
}


const { t, tm } = useI18n()

const projects = computed<Project[]>(() => {
  const raw = tm('project.list') as unknown
  if (!Array.isArray(raw)) return []

  // i18n-safe 매핑
  return raw.map((_, i) => {
    const mapArr = (path: string) => {
      const v = tm(path) as unknown
      return Array.isArray(v) ? v.map((__, idx) => t(`${path}[${idx}]`)) : []
    }

    const details = mapArr(`project.list[${i}].details`)
    const duties = mapArr(`project.list[${i}].duties`)
    const achievements = mapArr(`project.list[${i}].achievements`)
    const limitations = mapArr(`project.list[${i}].limitations`)
    const stacks = mapArr(`project.list[${i}].stacks`)  

    return {
      id: `${i+1}`,
      title: t(`project.list[${i}].title`),
      subtitle: t(`project.list[${i}].subtitle`),
      period: t(`project.list[${i}].period`),
      role: t(`project.list[${i}].role`),
      details,
      duties, 
      achievements,
      limitations,
      stacks,
    }
  })
})
</script>

<style scoped>
.work-exp :is(h2,h3,h4){ line-height:1.3; }
/* .company-card{
  position: sticky; top: 1rem; 
} */

.company-card {
  display: flex;
  align-items: stretch;  /* 이미지와 정보 영역의 높이를 동일하게 */
  border: 1px solid #ddd; /* 확인용 */
  height: 150px;     /* 카드 최소 높이 */
}

.company-logo {
  flex: 0 0 auto; /* 크기 고정 */
  height: 100%; /* 부모(.company-card)에 맞춤 */
}

.company-logo img {
  height: 100%;       /* 부모(company-card) 높이에 맞춤 */
  width: auto;        /* 비율 유지 */
  object-fit: contain;  /* 꽉 차게 채움 (여백 없이) */
  display: block;
}

.company-info {
  flex: 1;   /* 나머지 영역 차지 */
  padding: 0.5rem 0; /* 이미지랑 맞춰서 정렬 */
}

.project-card{
  border: 1px solid #eaeaea;
  border-radius: 12px;
  padding: 16px 18px;
  background: #fff;
}
.badge{ font-weight: 500; }
@media (max-width: 767.98px){
  .company-card{ position: static; }
}
</style>
