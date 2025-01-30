<script setup lang="ts">
import { useRoute } from "vue-router";

import { computed, watch } from "vue";

import { useSsrSearch } from "~/composables/search/useSsrSearch";

import { useLottieQuery } from "~/composables/queries/useSearchQuery";

const route = useRoute();

const query = route.params.query as string; // URL 파라미터에서 검색어 가져오기

const { initialData } = await useSsrSearch(query, "lottie");

const {
  data: lottieData,
  fetchNextPage,
  // hasNextPage,
} = useLottieQuery(
  computed(() => query),
  initialData
);

watch(
  () => route.params.query,
  (newKeyword, oldKeyword) => {
    if (newKeyword !== oldKeyword) {
      fetchNextPage();
    }
  }
);

const allUuids = computed(() =>
  lottieData.value?.pages.flatMap((page) => page.data.map((d) => d.uuid) || [])
);
</script>

<template>
  <div class="container-fluid py-4">
    <BRow>
      <BCol
        v-for="(uuid, i) in allUuids"
        :key="i"
        cols="12"
        sm="6"
        lg="4"
        class="mb-4"
      >
        <span>lottie: {{ uuid }}</span>
        <LottieCard :uuid="uuid" />
      </BCol>
    </BRow>
  </div>
</template>
