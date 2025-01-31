<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from "vue";

const keyword = ref("");
import { useRoute } from "vue-router";

const route = useRoute();
const query = route.params.query as string; // bring search keyword from URL

keyword.value = query;
</script>

<template>
  <div>
    <TheHeader page="3D Illustrations" />
    <main class="flex-grow-1 bg-light">
      <!-- Search Results -->
      <h2>{{ keyword }} 3D Illustrations</h2>
      <TheSubNavBar page="3D Illustrations" />
      <Search3DIllustration />
    </main>
    <TheFooter />
  </div>
</template>
