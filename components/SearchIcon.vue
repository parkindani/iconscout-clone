<script setup lang="ts">
import { useRoute } from "vue-router";

import { computed } from "vue";
import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useIconQuery } from "~/composables/queries/useSearchQuery";

const route = useRoute();

const query = route.params.query as string; // URL 파라미터에서 검색어 가져오기

const { initialData } = await useSsrSearch(query, "icon");

const { data: threeDData } = useIconQuery(
  computed(() => query),
  initialData
);

const allIconThumbnails = computed(() =>
  threeDData.value?.data.map((d) => d.urls.png_256)
);
</script>

<template>
  <div class="container-fluid py-4">
    <div class="d-flex flex-wrap justify-content-start gap-2">
      <div v-for="(thumb, i) in allIconThumbnails" :key="i">
        <ImageCard v-if="thumb" :src="thumb" is-icon />
      </div>
    </div>
  </div>
</template>
