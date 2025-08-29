<template>
  <section id="page-top">
    <div class="container-fluid p-0">
      <section id="about" class="resume-section p-3 p-lg-5 d-flex d-column" >
        <SectionsAbout />
      </section>

      <section id="experiences" class="resume-section p-3 p-lg-5 d-flex flex-column" >
        <SectionsExperiences />
      </section>

      <section id="projects" class="resume-section p-3 p-lg-5 d-flex flex-column" >
        <SectionsProjects />
      </section>

      <section id="education" class="resume-section p-3 p-lg-5 d-flex flex-column" >
        <SectionsEducation />
      </section>

      <section id="skills" class="resume-section p-3 p-lg-5 d-flex flex-column" >
        <SectionsSkills />
      </section>

      
    </div>
  </section>
</template>

<script lang="ts" setup>

</script>

<style scoped>
section.resume-section {
    border-bottom: 1px solid var(--color);
    padding-top: 5rem !important;
    padding-bottom: 5rem !important;
  }
  
  section.resume-section .resume-item .resume-date {
    min-width: none;
  }
  
  @media (min-width: 768px) {
    section.resume-section {
      min-height: 100vh;
    }
    section.resume-section .resume-item .resume-date {
      min-width: 18rem;
    }
  }
  
  @media (min-width: 992px) {
    section.resume-section {
      padding-top: 3rem !important;
      padding-bottom: 3rem !important;
    }
  }
  
</style>