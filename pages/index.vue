<script setup lang="ts">
// import TheHeader from '@/components/TheHeader.vue';
import TheMain from "@/components/TheMain.vue";
// import TheFooter from '@/components/TheFooter.vue';
// import TheSideBar from '@/components/TheSideBar.vue';

// import { ref } from 'vue';

// const isShowSidebar = ref(true);
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">
    <!-- <TheHeader /> -->
    <TheMain />
    <!-- <TheFooter /> -->
    <VueQueryDevtools />
  </div>
</template>
