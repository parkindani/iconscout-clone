<script setup lang="ts">
import type { PriceType, SortType } from "~/types/api";

import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted, watch } from "vue";
import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { use3DQuery } from "~/composables/queries/useSearchQuery";
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
  "3D Illustrations"
);

const page = ref(1);
const sort = computed<SortType>(
  () => (route.query.sort as SortType) || "relevant"
);
const price = computed<PriceType>(
  () => (route.query.price as PriceType) || "all"
);

const { initialData } = await useSsrSearch(query, "3d");
const {
  data: threeDData,
  isPlaceholderData,
  isLoading,
} = use3DQuery(
  computed(() => query),
  {
    page,
    sort,
    price,
  }
);

const all3DThumbnails = computed(() => {
  if (!threeDData.value) {
    const data = initialData.value?.response?.items?.data || [];
    return data.map((d) => {
      return {
        thumb: d.urls?.thumb || "",
        name: d.name,
      };
    });
  }
  return (
    threeDData.value?.data.map((d) => {
      return {
        thumb: d.urls?.thumb || "",
        name: d.name,
      };
    }) || []
  );
});

const total = computed(() => threeDData.value?.total || 0);

useJsonLdImagesSEO(
  computed(() => query),
  "3D Illustrations",
  all3DThumbnails
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
  if (threeDData.value?.currentPage === threeDData.value?.lastPage) return;
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
  <SubHeader :count="total" label="3D Illustrations" />
  <SubNavBar v-if="!props.allAssets" page="3D Illustrations" />

  <div class="d-flex">
    <Transition name="slide">
      <SearchFilter
        v-if="!props.allAssets && isShowFilter"
        page="3D Illustrations"
      />
    </Transition>
    <div>
      <section class="container-fluid py-4">
        <div
          role="region"
          aria-label="3D animations search results"
          class="d-flex flex-wrap justify-content-start gap-2"
        >
          <article v-for="(thumbnail, i) in all3DThumbnails" :key="i">
            <LastCardWrapper
              :link="`/3d-illustrations/${query}`"
              :is-last-card="
                props.allAssets && i === all3DThumbnails.length - 1
              "
            >
              <ImageCard
                v-if="thumbnail.thumb"
                :is-loading="isLoading || isPlaceholderData"
                :src="thumbnail.thumb"
                :name="thumbnail.name"
              />
              <span class="sr-only">{{ thumbnail.name }}</span>
            </LastCardWrapper>
          </article>
        </div>
        <PaginationBar
          v-if="!props.allAssets"
          :current-page="threeDData?.currentPage || 1"
          :last-page="threeDData?.lastPage || 1"
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
