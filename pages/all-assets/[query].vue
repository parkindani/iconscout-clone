<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "~/components/TheHeader.vue";

const keyword = ref("");
import { useRoute } from "vue-router";

const route = useRoute();
const query = route.params.query as string; // URL 파라미터에서 검색어 가져오기

keyword.value = query;
</script>

<template>
  <div>
    <TheHeader page="All Assets" />
    <main class="flex-grow-1 bg-light">
      <SubNavBar page="All Assets" />
      <!-- Search Results -->
      <SearchIllustration hide-sub-nav-bar />
      <Search3DIllustration hide-sub-nav-bar />
      <SearchLottieAnimation hide-sub-nav-bar only-first-page />
      <SearchIcon hide-sub-nav-bar />
    </main>
    <TheFooter />
  </div>
</template>
