<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, computed } from "vue";
import { useIllustrationQuery } from "~/composables/queries/useSearchQuery";
import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useSearchSEO, useJsonLdImagesSEO } from "~/composables/useSearchSEO";

const route = useRoute();
const query = route.params.query as string; // bring search keyword from URL

const props = defineProps<{
  hideSubNavBar?: boolean;
}>();

useSearchSEO(
  computed(() => query),
  "Illustrations"
);

const page = ref(1);

const { initialData } = await useSsrSearch(query, "illustration");
const { data: illustrations } = useIllustrationQuery(
  computed(() => query),
  {
    page,
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

const goPrevPage = () => {
  if (page.value === 1) return;
  page.value -= 1;
};

const goNextPage = () => {
  if (illustrations.value?.currentPage === illustrations.value?.lastPage)
    return;
  page.value += 1;
};
</script>

<template>
  <SubHeader :count="total" label="Illustrations" />
  <SubNavBar v-if="!props.hideSubNavBar" page="Illustrations" />
  <section class="container-fluid py-4">
    <div
      role="region"
      aria-label="Illustrations search results"
      class="d-flex flex-wrap justify-content-start gap-2"
    >
      <article v-for="(illust, i) in allIllustrations" :key="i">
        <ImageCard
          v-if="illust.thumb"
          :src="illust.thumb"
          :name="illust.name"
        />
        <span class="sr-only">{{ illust.name }}</span>
      </article>
    </div>
    <PaginationBar
      v-if="!props.hideSubNavBar"
      :current-page="illustrations?.currentPage || 1"
      :last-page="illustrations?.lastPage || 1"
      @prev="goPrevPage"
      @next="goNextPage"
    />
  </section>
</template>
