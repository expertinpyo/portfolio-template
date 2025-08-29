<template>
    <section>
        <NavBar />
        <div class="resume">
            <Resume />
        </div>
    </section>  
</template>

<script setup>
// Vue 3 Composition API 사용
</script>

<style scoped>
h1 {
  font-size: 3rem;
  line-height: 5.5rem;
}
@media (min-width: 992px) {
  .resume {
    padding-top: 0;
    padding-left: 17rem;
  }
}
</style>