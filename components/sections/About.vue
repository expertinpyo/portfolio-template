<template>
  <div class="my-auto">
    <h1 class="mb-0">
      {{ about.firstName }}
      <span class="text-primary">{{ about.lastName }}</span>
    </h1>

    <h3 class="mb-4">
      <span id="typed-target" />
    </h3>

    <div class="subheading mb-2">
      {{ about.location }} · {{ about.phone }} ·
      <span class="email-span">{{ about.email }}</span>
    </div>
    <div v-if="about.desc?.length" class="mb-5">
      <div v-for="(des, idx) in about.desc" :key="idx" class="mb-1">{{ des }}</div>
    </div>
    
    <ul class="list-inline list-social-icons mb-0">
      <li class="list-inline-item">
        <a v-if="about.linkedin" target="_blank" rel="noopener noreferrer" :href="about.linkedin">
          <span class="fa-stack fa-lg">
            <i class="fas fa-circle fa-stack-2x"></i>
            <i class="fab fa-linkedin-in fa-stack-1x fa-inverse"></i>
          </span>
        </a>
      </li>
      <li class="list-inline-item">
        <a v-if="about.github" target="_blank" rel="noopener noreferrer" :href="about.github">
          <span class="fa-stack fa-lg">
            <i class="fas fa-circle fa-stack-2x"></i>
            <i class="fab fa-github-alt fa-stack-1x fa-inverse"></i>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { tm, t } = useI18n()
const typed = useTypedJs()

type About = {
  firstName: string
  lastName: string
  location: string
  phone: string
  email: string
  linkedin: string
  github: string
  desc: string[]
}

const about = computed<About>(() => {
  const raw = tm('about') as unknown
  if (typeof raw !== 'object' || !raw) return {} as About

  const mapArr = (path: string): string[] => {
    const v = tm(path) as unknown
    return Array.isArray(v) ? v.map((__, idx) => t(`${path}[${idx}]`)) : []
  } 

  return {
    firstName: t('about.firstName'),
    lastName: t('about.lastName'),
    location: t('about.location'),
    phone: t('about.phone'),
    email: t('about.email'),
    linkedin: t('about.linkedin'),
    github: t('about.github'),
    desc: mapArr('about.desc')
  }
})

const roles = computed(() => {
  const raw = tm('about.typedTargets') as unknown
  if (!Array.isArray(raw)) return []
  return raw.map((_, i) => t(`about.typedTargets[${i}]`))
})



let instance: any
function init() {
  if (!roles.value.length) return
  instance?.destroy()
  instance = typed('#typed-target', {
    strings: roles.value, // ← 순수 문자열 배열
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    smartBackspace: true
  })
}

onMounted(init)
watch(roles, () => init())        // 로케일 변경 등으로 값 바뀌면 재초기화
onBeforeUnmount(() => instance?.destroy())
</script>

<style scoped>
.list-social-icons a {
    color: var(--color-primary);
  }
  
.list-social-icons a:hover {
  color: var(--color-primary-hover);
}

.list-social-icons a .fa-lg {
  font-size: 1.75rem;
}

.list-icons {
  font-size: 3rem;
}

.list-icons .list-inline-item i:hover {
  color: var(--color-primary-hover);
}

.email-span {
  color: var(--color-secondary);
}
</style>