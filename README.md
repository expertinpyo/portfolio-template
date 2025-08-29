# Portfolio Template (Nuxt 4)

A customizable **portfolio & resume web template** built with **Nuxt 4**.  
This project is inspired by [Nuxt Resume Template](https://nuxtjstemplates.com/product/nuxt-resume), but significantly restructured and extended.

---

## 🚀 Key Differences from the Reference Project

- **Nuxt 2 → Nuxt 4 Migration**  
  Updated to the latest Nuxt ecosystem (Nuxt 4, Vite, Vue 3 Composition API).

- **Dynamic Project Detail Pages via `slug`**  
  Each project now supports a dedicated page powered by Markdown (`/content/*.md`).  
  Example: `/project/acme-dummy` loads from `content/project/acme-dummy.md`.

- **Structured Data via JSON**  
  All profile data (`about`, `experience`, `education`, `project`, `skills`) is **centralized in JSON files** for easier updates and internationalization.

---

## 📂 Project Structure

```bash
portfolio-template/
├─ assets/
│   └─ css/               # main.css
├─ public/
│   └─ imgs/              # all images for this template including profile, logos and projects
├─ components/            # Vue components for UI sections
├─ content/               # Markdown (.md) files for project detail pages
│   └─ `[slug]`/          # One .md file per project slug
├─ i18n/locales/
│   ├─ resume.json        # Core profile data (about, experience, education, projects, skills & langauge)
│   └─ labels.json        # labels
├─ pages/
│   ├─ index.vue          # Home layout, loads JSON data
│   └─ project/[slug].vue # Dynamic project detail page
└─ nuxt.config.ts         # Nuxt 4 config
```

---

## 📑 JSON Data Structure

All editable data is stored in [`/i18n/locales/language folder/resume.json`]
You have to define each resume.json file for each language you want to show.

All data is made by GPT, as dummies for explaination.

### Example Overview

```json
{
  "about": { ... },
  "experience": { "list": [ ... ] },
  "education": { "list": [ ... ] },
  "project": { "list": [ ... ] },
  "skills": { "list": [ ... ], "languages": [ ... ] }
}
```

---

### 🔹 `about`
Basic profile info (name, role, contact, description, social links).

```json
"about": {
  "fullName": "Jordan Bauer",
  "firstName": "Jordan",
  "lastName": "Bauer",
  "typedTargets": ["Full-Stack Web Developer", "Continuous Learner"],
  "location": "Europe",
  "phone": "+1 00 000 0000",
  "email": "example{'@'}mail.com",
  "linkedin": "https://linkedin.com/",
  "github": "https://github.com/",
  "desc": [
    "3+ years of web development experience",
    "Focused on scalable applications"
  ]
}
```

- Profile photo should be placed under `/public/imgs/profile.png`.

---

### 🔹 `experience`
Work history, each with company details and multiple projects.
If you set slug value, the title of this project would be clickable and automatically match a markdown file in `/content/language folder/{slug}.md` 

```json
"experience": {
  "list": [
    {
      "company": "Acme Solutions",
      "team": "Web Applications Division",
      "logo": "/imgs/logo_acme.png",
      "link": "https://example.com",
      "role": "Full-Stack Engineer",
      "period": "Nov 2023 - Present",
      "projects": [
        {
          "title": "Analytics Dashboard",
          "subtitle": "Real-time KPI monitoring",
          "slug": "acme-analytics", 
          "period": "2024",
          "duties": [
            { "text": "Frontend", "sub": ["Chart.js", "TailwindCSS"] },
            { "text": "Backend", "sub": ["Redis", "Spring Boot"] }
          ],
          "achievements": ["Improved response time by 40%"],
          "stacks": ["Vue.js", "Spring Boot", "PostgreSQL"]
        }
      ]
    }
  ]
}
```

📌 EX. The slug (`"acme-analytics"`) must match the Markdown file under `/content/language folder/acme-analytics`.

- Logos for companies → `/public/imgs/logo_xxx.png`

---

### 🔹 `education`

```json
"education": {
  "list": [
    {
      "name": "Tech Academy Europe",
      "degree": "Full-Stack Web Development Program",
      "period": "2020",
      "desc": ["Studied Vue, React, Node.js, Spring Boot"],
      "logo": "/imgs/logo_techacademy.png"
    }
  ]
}
```

---

### 🔹 `project`

Each project is listed in JSON and linked with a `.md` file for details.
If you set slug value, the title of this project would be clickable and automatically match a markdown file in `/content/language folder/{slug}.md`

```json
"project": {
  "list": [
    {
      "title": "EventFlow",
      "subtitle": "Ticketing & Reservation Platform",
      "role": "Full-Stack Engineer",
      "period": "2025",
      "slug": "eventflow",
      "details": ["Seat map editor", "Stripe integration"],
      "stacks": ["Next.js", "NestJS", "PostgreSQL"]
    }
  ]
}
```

📌 EX. The slug (`"eventflow"`) must match the Markdown file under `/content/project/eventflow.md`.

---

### 🔹 `skills`

```json
"skills": {
  "list": [
    {
      "group": "first",
      "name": "Vue.js",
      "icon": "fa-brands fa-vuejs",
      "desc": ["SPA development", "Composition API"]
    }
  ],
  "languages": [
    { "name": "English", "level": "Fluent (C1)", "country": "US" },
    { "name": "German", "level": "Intermediate (B1)", "country": "DE" }
  ]
}
```

---

## 🌍 Adding a New Language

1. Duplicate `resume.json` into a new file (e.g., `de/resume.json`).  
2. Translate all fields.  
3. Update i18n settings in `nuxt.config.ts`:

```ts
i18n: {
  locales: [
    { code: 'en', file: 'en/resume.json' },
    { code: 'de', file: 'de/resume.json' }
  ],
  defaultLocale: 'en'
}
```

4. Switch languages via dropdown or route prefix.

---

## 📖 Project Detail Pages (`/content/*.md`)

- Each project in JSON has a matching Markdown file:  
  Example: `slug: "eventflow"` → `/content/project/eventflow.md`

- Markdown supports standard syntax, images, and diagrams.  
- Example:

```markdown
---
title: "EventFlow – Ticketing & Seat Reservation Platform"
description: "Scalable ticketing system with Stripe integration"
---

# EventFlow

## Summary
A multi-tenant platform for ticket sales and seat reservations.

## Responsibilities
- Built seat-map editor with React + Canvas
- Implemented Redis-based reservation queue
- Integrated Stripe for payments

## Tech Stack
- Frontend: Next.js, React
- Backend: NestJS, PostgreSQL, Redis
```

---

## 📄 Page-by-Page Explanation

### 🧑 About Page
- Loads from `about` in `resume.json`.  
- Profile picture: `/public/imgs/profile.png`.

### 💼 Experience Page
- Reads company list from `experience.list`.  
- Detail pages rendered from `/content/.../*.md`.

### 🎓 Education Page
- Reads from `education.list`.  
- Logos placed in `/public/imgs`.

### 📂 Project Page
- Shows all projects from `project.list`.  
- Detail pages rendered from `/content/.../*.md`.

### 🛠 Skills & Languages Page
- Loads from `skills.list` and `skills.languages`.  
- Supports icons (FontAwesome).

---

## 🖼 Images

- All logos, avatars, and screenshots should be placed in `/public/imgs/`.  
- Refer to them in Markdown via relative paths, e.g. `/imgs/[slug]/[file_name].png`.

---

## 🖼 Screenshots

### About Section (Main page)
![About Section](/public/imgs/screenshots/about.png)

### Experience Section
![Experience Section](/public/imgs/screenshots/experience.png)

### Project List
![Project List](/public/imgs/screenshots/projects.png)

### Project Detail Page
![Project Detail Page](/public/imgs/screenshots/project_detail.png)

### Education Section
![Education](/public/imgs/screenshots/education.png)

### Skills & Languages
![Skills & Languages](/public/imgs/screenshots/skills.png)




## 📚 References

- Nuxt Resume Template (original reference):  
  https://nuxtjstemplates.com/product/nuxt-resume  

- Nuxt 4 Documentation:  
  https://nuxt.com/docs  

---

## 📦 Setup

```bash
# Install dependencies
npm install

# Run in dev mode
npm run dev

# Build for production
npm run build
npm run preview
```

---

## 📝 License

This project is provided as a **template** for personal portfolio usage.  
Feel free to fork and customize.
