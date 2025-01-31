<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useLottieQuery } from "~/composables/queries/useSearchQuery";
import { useIntersectionObserver } from "~/composables/useIntersectionObserver";
import { useSearchSEO, useJsonLdLottieSEO } from "~/composables/useSearchSEO";

const route = useRoute();
const query = route.params.query as string; // bring search keyword from URL

useSearchSEO(
  computed(() => query),
  "Lottie Animations"
);

const props = defineProps<{
  onlyFirstPage?: boolean;
  hideSubNavBar?: boolean;
}>();

const { initialData } = await useSsrSearch(query, "lottie");
const {
  data: lottieData,
  fetchNextPage,
  hasNextPage,
  isLoading,
} = useLottieQuery(
  computed(() => query),
  initialData,
  false
);

const { $targetRef: $bottomRef, isIntersecting } = useIntersectionObserver();

watch(
  [
    () => isLoading.value,
    () => query,
    () => isIntersecting.value,
    () => hasNextPage.value,
  ],
  () => {
    if (isLoading.value) {
      return;
    }

    if (!query) {
      return;
    }

    if (!isIntersecting.value) {
      return;
    }

    if (!hasNextPage.value) {
      return;
    }

    console.log("fetchNextPage");
    return fetchNextPage();
  }
);

const allLottieAnimations = computed(() => {
  const list =
    lottieData.value?.pages.flatMap(
      (page) =>
        page.data.map(({ uuid, name }) => {
          return { uuid, name };
        }) || []
    ) || [];

  if (props.onlyFirstPage) {
    return list.slice(0, 10);
  }

  return list;
});

const total = computed(() => lottieData.value?.pages[0].total || 0);

useJsonLdLottieSEO(
  computed(() => query),
  allLottieAnimations
);
</script>

<template>
  <SubHeader :count="total" label="Lottie Animations" />
  <SubNavBar v-if="!props.hideSubNavBar" page="Lottie Animations" />
  <section class="container-fluid py-4">
    <div
      role="region"
      aria-label="Lottie animation search results"
      class="d-flex flex-wrap justify-content-start gap-2"
    >
      <article v-for="(lottie, i) in allLottieAnimations" :key="i">
        <LottieCard :uuid="lottie.uuid" />
        <span class="sr-only">{{ lottie.name }}</span>
      </article>
    </div>

    <!-- MARK: empty div to check end -->
    <div ref="$bottomRef"></div>
  </section>
</template>
