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
    <TheHeader path="Icons" />

    <main class="flex-grow-1 bg-light">
      <!-- Search Results -->
      <h2>{{ keyword }} Icons</h2>
      <SearchIcon />
    </main>

    <TheFooter />
  </div>
</template>
