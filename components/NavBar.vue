<template>
  <nav
    id="sideNav"
    class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
  >
    <a class="navbar-brand js-scroll-trigger" href="#page-top">
      <span class="d-block d-lg-none">{{ t('about.fullName') }}</span>
      <span class="d-none d-lg-block">
        <img
          class="img-fluid img-profile rounded-circle mx-auto mb-2"
          :src="t('about.profile')"
          alt=""
        />
      </span>
    </a>

    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="#" @click.prevent="jumpTo('#about')">
            {{ t('nav.about') }}
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="#" @click.prevent="jumpTo('#experiences')">
            {{ t('nav.experiences') }}
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="#" @click.prevent="jumpTo('#projects')">
            {{ t('nav.projects') }}
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="#" @click.prevent="jumpTo('#education')">
            {{ t('nav.education') }}
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="#" @click.prevent="jumpTo('#skills')">
            {{ t('nav.skills') }}
          </a>
        </li>

        <li class="nav-item lang-switcher">
          <div class="btn-group" role="group" aria-label="Language switcher">
            <button
              v-for="l in items"
              :key="l.code"
              class="btn btn-outline-light flag-btn"
              :class="{ active: l.code === locale }"
              :title="l.name"
              :aria-label="l.name"
              @click="onLang(l.code)"
            >
              <span :class="['fi', 'fi-' + ccLower(l.flag)]"></span>
              <span class="visually-hidden">{{ l.name }}</span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import jump from 'jump.js'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { t, locales, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const jumpTo = (target: string | Element) => {
  jump(target, { duration: 100, offset: 0 })
}

function onLang(code: string) {
  if (code === locale.value) return
  const to = switchLocalePath(code)
  if (!to) return
  navigateTo({ path: to, query: route.query, hash: route.hash })
}

function ccLower(cc?: string) {
  if (!cc) return 'en'
  let c = cc.trim().toLowerCase()
  if (c === 'uk') c = 'gb'
  if (c === 'en') c = 'en'
  c = c.replace(/[^a-z]/g, '').slice(0, 2)
  return c || 'en'
}

const items = computed(() =>
  locales.value.map((l: any) => {
    const country =
      l.country || (l.language?.includes('-') ? l.language.split('-')[1] : 'en')
    return { code: l.code, name: l.name, flag: ccLower(country) }
  })
)
</script>

<style scoped>
.flag-btn { font-size: 1.25rem; line-height: 1; padding: .25rem .5rem; }
.flag-btn.active { background-color: rgba(255,255,255,.2); }

#sideNav .lang-switcher{
  position: fixed;
  transform: translate(100%, 1300%);
}

#sideNav .navbar-nav .nav-item .nav-link {
  font-weight: 600;
  text-transform: uppercase;
}

@media (min-width: 992px) {
  #sideNav {
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 17rem;
    height: 100vh;
  }
  #sideNav .navbar-brand {
    display: flex;
    margin: auto auto 0;
    padding: 0.5rem;
  }
  #sideNav .navbar-brand .img-profile {
    max-width: 10rem;
    max-height: 10rem;
    border: 0.5rem solid rgba(255, 255, 255, 0.2);
  }
  #sideNav .navbar-collapse {
    display: flex;
    align-items: flex-start;
    flex-grow: 0;
    width: 100%;
    margin-bottom: auto;
  }
  #sideNav .navbar-collapse .navbar-nav {
    flex-direction: column;
    width: 100%;
  }
  #sideNav .navbar-collapse .navbar-nav .nav-item {
    display: block;
  }
  #sideNav .navbar-collapse .navbar-nav .nav-item .nav-link {
    display: block;
  }
}
</style>
