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
} = useLottieQuery(
  computed(() => query),
  initialData
);

const { $targetRef: $bottomRef, isIntersecting } = useIntersectionObserver({
  onIntersect: (isIntersecting) => {
    if (props.onlyFirstPage) return;
    if (!isIntersecting || !hasNextPage.value || !query) return;
    return fetchNextPage();
  },
});

const isInitialSearchLoading = ref(true);

watch(
  [
    () => query,
    () => isInitialSearchLoading.value,
    () => isIntersecting.value,
    () => hasNextPage.value,
  ],
  () => {
    if (!isInitialSearchLoading.value || !query) return;
    if (isIntersecting.value || !hasNextPage.value) {
      fetchNextPage();
    } else {
      isInitialSearchLoading.value = false;
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
    </div>

    <!-- MARK: empty div to check end -->
    <div v-if="!props.onlyFirstPage" ref="$bottomRef"></div>
  </section>
</template>
