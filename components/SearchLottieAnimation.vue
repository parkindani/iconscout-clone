<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useLottieQuery } from "~/composables/queries/useSearchQuery";
import { useIntersectionObserver } from "~/composables/useIntersectionObserver";
import { useSearchSEO, useJsonLdLottieSEO } from "~/composables/useSearchSEO";
import { useFakeAuth } from "~/composables/useFakeAuth";

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
  initialData,
  false
);

const { isAuthenticated, login } = useFakeAuth();
const isInitialSearchLoading = ref(true);
const loadCount = ref(0);
const isBlocked = ref(false);

const { $targetRef: $bottomRef, isIntersecting } = useIntersectionObserver({
  onIntersect: async (isIntersecting) => {
    if (props.onlyFirstPage) {
      return;
    }

    if (!isAuthenticated.value && loadCount.value >= 1) {
      isBlocked.value = true;
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
      if (!isAuthenticated.value && loadCount.value >= 1) {
        isBlocked.value = true;
        isInitialSearchLoading.value = false;
        return;
      }

      await fetchNextPage();
      loadCount.value++;
      return;
    } else {
      isInitialSearchLoading.value = false;
      return;
    }
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

const onLogin = () => {
  login();
  isBlocked.value = false;
  if (isIntersecting.value) {
    fetchNextPage();
  }
};

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
      <article v-if="!props.onlyFirstPage && isFetchingNextPage">
        <LoadingCard />
      </article>
      <article v-if="!props.onlyFirstPage && !hasNextPage">
        <EndingCard />
      </article>
    </div>

    <div v-if="isBlocked" class="blocker">
      <h6>View all Limit 3D Illustrations</h6>
      <button @click="onLogin" class="btn btn-primary">
        Get Started - It's Free
      </button>
      <p>Already have an account? <strong @click="onLogin">Log In</strong></p>
    </div>

    <!-- MARK: empty div to check end -->
    <div v-if="!props.onlyFirstPage" ref="$bottomRef"></div>
  </section>
</template>

<style lang="scss" scoped>
section {
  position: relative;

  .blocker {
    height: 402px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.99)
    );
    color: white;
    z-index: 100;

    h6 {
      font-size: 24px;
      line-height: 36px;
      font-weight: 700;
      margin-bottom: 20px;
      color: #000000;
    }

    button {
      background-color: #0092e4;
      padding: 13px 48px;
      color: #ffffff;
      border-radius: 12px;
      margin-bottom: 12px;
      font-size: 18px;
      line-height: 28px;
    }

    p {
      font-size: 18px;
      line-height: 28px;
      font-weight: 400;
      margin-bottom: 51px;
      color: #000000;

      strong {
        cursor: pointer;
        font-weight: 600;
        color: #0092e4;
      }
    }
  }
}
</style>
