<script setup lang="ts">
import { useRoute } from "vue-router";

import { computed, watch } from "vue";
import { useLottieQuery } from "~/composables/queries/useSearchQuery";

const route = useRoute();

const query = route.params.query as string; // URL 파라미터에서 검색어 가져오기

const {
  data: lottieData,
  fetchNextPage,
  // hasNextPage,
} = useLottieQuery(computed(() => query));

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
        <ClientOnly>
          <LottieCard :uuid="uuid" />
        </ClientOnly>
      </BCol>
    </BRow>
  </div>
</template>
