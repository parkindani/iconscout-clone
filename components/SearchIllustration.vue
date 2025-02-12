<script setup lang="ts">
import type { PriceType, SortType } from "~/types/api";

import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
import { useIllustrationQuery } from "~/composables/queries/useSearchQuery";
import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useSearchSEO, useJsonLdImagesSEO } from "~/composables/useSearchSEO";
import { useShowFilter } from "~/composables/useShowFilter";

const route = useRoute();
const router = useRouter();
const query = route.params.query as string; // bring search keyword from URL

const { isShowFilter } = useShowFilter();

const props = defineProps<{
  allAssets?: boolean;
}>();

useSearchSEO(
  computed(() => query),
  "Illustrations"
);

const page = ref(1);
const sort = computed<SortType>(
  () => (route.query.sort as SortType) || "relevant"
);
const price = computed<PriceType>(
  () => (route.query.price as PriceType) || "all"
);

const { initialData } = await useSsrSearch(query, "illustration");
const {
  data: illustrations,
  isPlaceholderData,
  isLoading,
} = useIllustrationQuery(
  computed(() => query),
  {
    page,
    sort,
    price,
  }
);

const allIllustrations = computed(() => {
  if (!illustrations.value) {
    const data = initialData.value?.response?.items?.data || [];
    return data.map((d) => {
      return {
        thumb: d.urls?.thumb || "",
        name: d.name,
      };
    });
  }
  return (
    illustrations.value?.data.map((d) => {
      return {
        thumb: d.urls?.thumb || "",
        name: d.name,
      };
    }) || []
  );
});

const total = computed(() => illustrations.value?.total || 0);

useJsonLdImagesSEO(
  computed(() => query),
  "Illustrations",
  allIllustrations
);

onMounted(() => {
  if (route.query.page) {
    page.value = Number(route.query.page);
  }
});

watch(
  () => route.query.page,
  (newPage) => {
    if (newPage && Number(newPage) !== page.value) {
      page.value = Number(newPage);
    }
  }
);

const goPrevPage = () => {
  if (page.value === 1) return;
  page.value -= 1;
  router.push({
    query: {
      ...route.query,
      page: page.value,
    },
  });
};

const goNextPage = () => {
  if (illustrations.value?.currentPage === illustrations.value?.lastPage)
    return;
  page.value += 1;
  router.push({
    query: {
      ...route.query,
      page: page.value,
    },
  });
};
</script>

<template>
  <SubHeader :count="total" label="Illustrations" />
  <SubNavBar v-if="!props.allAssets" page="Illustrations" />

  <div class="d-flex">
    <Transition name="slide">
      <SearchFilter
        v-if="!props.allAssets && isShowFilter"
        page="Illustrations"
      />
    </Transition>
    <div>
      <section class="container-fluid py-4">
        <div
          role="region"
          aria-label="Illustrations search results"
          class="d-flex flex-wrap justify-content-start gap-2"
        >
          <article v-for="(illust, i) in allIllustrations" :key="i">
            <LastCardWrapper
              :link="`/illustrations/${query}`"
              :is-last-card="
                props.allAssets && i === allIllustrations.length - 1
              "
            >
              <ImageCard
                v-if="illust.thumb"
                :is-loading="isLoading || isPlaceholderData"
                :src="illust.thumb"
                :name="illust.name"
              />
            </LastCardWrapper>

            <span class="sr-only">{{ illust.name }}</span>
          </article>
        </div>
        <PaginationBar
          v-if="!props.allAssets"
          :current-page="illustrations?.currentPage || 1"
          :last-page="illustrations?.lastPage || 1"
          @prev="goPrevPage"
          @next="goNextPage"
        />
      </section>
    </div>
  </div>
</template>

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
