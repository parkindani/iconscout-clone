<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from "vue";
import TheHeader from "~/components/TheHeader.vue";

const keyword = ref("");
import { useRoute } from "vue-router";

const route = useRoute();
const query = route.params.query as string; // bring the search keyword from the URL parameter

keyword.value = query;
</script>

<template>
  <div>
    <TheHeader page="Dot Lottie" />

    <main class="flex-grow-1 bg-light">
      <h2>{{ keyword }} Animations</h2>
      <TheSubNavBar page="Dot Lottie" />
      <SearchDotLottieAnimation is-dot-lottie />
    </main>

    <TheFooter />
  </div>
</template>
