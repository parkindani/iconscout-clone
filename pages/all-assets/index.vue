<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import TheHeader from "~/components/TheHeader.vue";
</script>

<template>
  <div class="main-page">
    <TheHeader />
    <main />
    <TheFooter />
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
