<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useLottieQuery } from "~/composables/queries/useSearchQuery";
import { useIntersectionObserver } from "~/composables/useIntersectionObserver";
// const tabs = [
//   { name: 'All', current: true },
//   { name: 'Popular', current: false },
//   { name: 'Recent', current: false },
//   { name: 'Featured', current: false },
// ]
const isInitialSearchLoading = ref(true);
const inputValue = ref("");
const keyword = ref("");

// infinite scroll query
const {
  data: lottieData,
  fetchNextPage,
  hasNextPage,
} = useLottieQuery(computed(() => keyword.value));

const { $targetRef: $bottomRef, isIntersecting } = useIntersectionObserver({
  onIntersect: (isIntersecting) => {
    if (!isIntersecting || !hasNextPage.value || !keyword.value) return;
    return fetchNextPage();
  },
});

watch(
  [
    () => isIntersecting.value,
    () => isInitialSearchLoading.value,
    () => hasNextPage.value,
    () => keyword.value,
  ],
  () => {
    if (!isInitialSearchLoading.value || !keyword.value) return;
    if (isIntersecting.value || !hasNextPage.value) {
      fetchNextPage();
    } else {
      isInitialSearchLoading.value = false;
    }
  }
);

const allUuids = computed(() =>
  lottieData.value?.pages.flatMap((page) => page.results || [])
);
</script>

<template>
  <main class="flex-grow-1 bg-light">
    <!-- Tab Filters -->
    <!-- <BNav tabs class="px-4 border-bottom">
      <BNavItem v-for="tab in tabs" :key="tab.name" :active="tab.current">
        {{ tab.name }}
      </BNavItem>
    </BNav> -->

    <!-- Search Input -->
    <form>
      <input
        v-model="inputValue"
        type="text"
        placeholder="Search from 8 Million+ assets"
      />
      <button @click.prevent="keyword = inputValue" type="submit">
        Search
      </button>
    </form>

    <!-- Search Results -->
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
      <!-- MARK: empty div to check end -->
      <div ref="$bottomRef"></div>
    </div>
  </main>
</template>
