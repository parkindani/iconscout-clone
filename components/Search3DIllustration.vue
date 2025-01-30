<script setup lang="ts">
import { useRoute } from "vue-router";

import { computed } from "vue";
import { useSsrSearch } from "~/composables/search/useSsrSearch";

import { use3DQuery } from "~/composables/queries/useSearchQuery";

const route = useRoute();

const query = route.params.query as string; // bring search keyword from URL

const { initialData } = await useSsrSearch(query, "3d");

const { data: threeDData } = use3DQuery(
  computed(() => query),
  initialData
);

const all3DThumbnails = computed(() =>
  threeDData.value?.data.map((d) => d.urls.thumb)
);
</script>

<template>
  <div class="container-fluid py-4">
    <BRow>
      <BCol
        v-for="(thumb, i) in all3DThumbnails"
        :key="i"
        cols="12"
        sm="6"
        lg="4"
        class="mb-4"
      >
        <span>{{ thumb }}</span>
        <ImageCard v-if="thumb" :src="thumb" />
      </BCol>
    </BRow>
  </div>
</template>
