<script setup lang="ts">
import type { SortType } from "~/types/api";

import { useRoute } from "vue-router";
import { ref, computed, watch } from "vue";

import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useLottieQuery } from "~/composables/queries/useSearchQuery";
import { useIntersectionObserver } from "~/composables/useIntersectionObserver";
import { useSearchSEO, useJsonLdLottieSEO } from "~/composables/useSearchSEO";
import { useFakeAuth } from "~/composables/useFakeAuth";
import { useShowFilter } from "~/composables/useShowFilter";

const route = useRoute();
const query = route.params.query as string; // bring search keyword from URL

useSearchSEO(
  computed(() => query),
  "Lottie Animations"
);

const { isShowFilter } = useShowFilter();

const props = defineProps<{
  allAssets?: boolean;
}>();

const sort = computed<SortType>(
  () => (route.query.sort as SortType) || "relevant"
);

const { initialData } = await useSsrSearch(query, "lottie");
const {
  data: lottieData,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useLottieQuery(
  computed(() => query),
  initialData,
  false,
  {
    sort,
  }
);

const { isAuthenticated, login } = useFakeAuth();
const isInitialSearchLoading = ref(true);
const loadCount = ref(0);
const isBlocked = ref(false);

const { $targetRef: $bottomRef, isIntersecting } = useIntersectionObserver({
  onIntersect: async (isIntersecting) => {
    if (props.allAssets) {
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
    if (props.allAssets) {
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

  if (props.allAssets) {
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
  <SubNavBar v-if="!props.allAssets" page="Lottie Animations" />

  <div class="d-flex">
    <Transition name="slide">
      <SearchFilter
        v-if="!props.allAssets && isShowFilter"
        page="Lottie Animations"
      />
    </Transition>
    <div>
      <section class="container-fluid py-4">
        <div
          role="region"
          aria-label="Lottie animation search results"
          class="d-flex flex-wrap justify-content-start gap-2"
        >
          <article v-for="(lottie, i) in allLottieAnimations" :key="i">
            <LastCardWrapper
              :link="`/lottie-animations/${query}`"
              :is-last-card="
                props.allAssets && i === allLottieAnimations.length - 1
              "
            >
              <LottieCard :uuid="lottie.uuid" />
              <span class="sr-only">{{ lottie.name }}</span>
            </LastCardWrapper>
          </article>
          <article v-if="!props.allAssets && isFetchingNextPage">
            <LoadingCard />
          </article>
          <article v-if="!props.allAssets && !hasNextPage">
            <EndingCard />
          </article>
        </div>

        <div v-if="isBlocked" class="blocker">
          <h6>View all Limit 3D Illustrations</h6>
          <button @click="onLogin" class="btn btn-primary">
            Get Started - It's Free
          </button>
          <p>
            Already have an account? <strong @click="onLogin">Log In</strong>
          </p>
        </div>

        <!-- MARK: empty div to check end -->
        <div v-if="!props.allAssets" ref="$bottomRef"></div>
      </section>
    </div>
  </div>
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

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s linear;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
