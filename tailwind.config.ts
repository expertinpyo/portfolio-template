// tailwind.config.ts (수정 후)

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{ // ✅ Partial<Config>로 타입을 변경해 주세요.
  prefix: 'tw-',
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./app.vue`,
    `./error.vue`
  ]
}