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
  isFetchingNextPage,
} = useLottieQuery(
  computed(() => query),
  initialData
);

const isInitialSearchLoading = ref(true);
const loadCount = ref(0);

const { $targetRef: $bottomRef, isIntersecting } = useIntersectionObserver({
  onIntersect: async (isIntersecting) => {
    if (props.onlyFirstPage) {
      return;
    }

    if (!isIntersecting || !hasNextPage.value || !query) {
      return;
    }

    await fetchNextPage();
    loadCount.value++;
  },
});

watch(
  [
    () => query,
    () => isInitialSearchLoading.value,
    () => isIntersecting.value,
    () => hasNextPage.value,
    () => loadCount.value,
  ],
  async () => {
    if (props.onlyFirstPage) {
      return;
    }

    if (!isInitialSearchLoading.value) {
      return;
    }

    if (!query) {
      return;
    }

    if (!hasNextPage.value) {
      isInitialSearchLoading.value = false;
      return;
    }

    if (isFetchingNextPage.value) {
      return;
    }

    if (isIntersecting.value && hasNextPage.value) {
      await fetchNextPage();
      loadCount.value++;
      return;
    } else {
      isInitialSearchLoading.value = false;
      return;
    }
  }
);

const allLottieAnimations = computed(
  () =>
    lottieData.value?.pages.flatMap(
      (page) =>
        page.data.map(({ uuid, name }) => {
          return { uuid, name };
        }) || []
    ) || []
);

const total = computed(() => lottieData.value?.pages[0].total || 0);

useJsonLdLottieSEO(
  computed(() => query),
  allLottieAnimations
);
</script>

<template>
  <SubHeader :count="total" label="dotLottie Animations" />
  <SubNavBar v-if="!props.hideSubNavBar" page="Dot Lottie" />
  <section class="container-fluid py-4">
    <div
      role="region"
      aria-label="Lottie animation search results"
      class="d-flex flex-wrap justify-content-start gap-2"
    >
      <article v-for="(lottie, i) in allLottieAnimations" :key="i">
        <DotLottieCard :uuid="lottie.uuid" />
        <span class="sr-only">{{ lottie.name }}</span>
      </article>
      <article v-if="!props.onlyFirstPage && isFetchingNextPage">
        <LoadingCard />
      </article>
      <article v-if="!props.onlyFirstPage && !hasNextPage">
        <EndingCard />
      </article>
    </div>

    <!-- MARK: empty div to check end -->
    <div v-if="!props.onlyFirstPage" ref="$bottomRef"></div>
  </section>
</template>
