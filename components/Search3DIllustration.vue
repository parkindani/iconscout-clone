<script setup lang="ts">
import { useRoute } from "vue-router";

import { computed } from "vue";
import { use3DQuery } from "~/composables/queries/useSearchQuery";

const route = useRoute();

const query = route.params.query as string; // URL 파라미터에서 검색어 가져오기

const { data: threeDData } = use3DQuery(computed(() => query));

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
        <ClientOnly>
          <ImageCard v-if="thumb" :src="thumb" />
        </ClientOnly>
      </BCol>
    </BRow>
  </div>
</template>
