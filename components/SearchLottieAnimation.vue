<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useLottieQuery } from "~/composables/queries/useSearchQuery";
import { useIntersectionObserver } from "~/composables/useIntersectionObserver";
import { useSearchSEO } from "~/composables/useSearchSEO";

useSearchSEO(
  computed(() => query),
  "Lottie Animations"
);

const route = useRoute();
const query = route.params.query as string; // bring search keyword from URL

const props = defineProps<{
  onlyFirstPage?: boolean;
  isDotLottie?: boolean;
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

const allUuids = computed(() =>
  lottieData.value?.pages.flatMap((page) => page.data.map((d) => d.uuid) || [])
);
</script>

<template>
  <section class="container-fluid py-4">
    <div class="d-flex flex-wrap justify-content-start gap-2">
      <article v-for="(uuid, i) in allUuids" :key="i">
        <LottieCard :uuid="uuid" />
      </article>
    </div>

    <!-- MARK: empty div to check end -->
    <div ref="$bottomRef"></div>
  </section>
</template>
