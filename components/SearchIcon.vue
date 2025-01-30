<script setup lang="ts">
import { useRoute } from "vue-router";

import { computed } from "vue";
import { useIconQuery } from "~/composables/queries/useSearchQuery";

const route = useRoute();

const query = route.params.query as string; // URL 파라미터에서 검색어 가져오기

const { data: threeDData } = useIconQuery(computed(() => query));

const allIconThumbnails = computed(() =>
  threeDData.value?.data.map((d) => d.urls.png_256)
);
</script>

<template>
  <div class="container-fluid py-4">
    <BRow>
      <BCol
        v-for="(thumb, i) in allIconThumbnails"
        :key="i"
        cols="12"
        sm="6"
        lg="4"
        class="mb-4"
      >
        <ClientOnly>
          <ImageCard v-if="thumb" :src="thumb" />
        </ClientOnly>
      </BCol>
    </BRow>
  </div>
</template>
