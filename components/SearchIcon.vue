<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useIconQuery } from "~/composables/queries/useSearchQuery";
import { useSearchSEO, useJsonLdImagesSEO } from "~/composables/useSearchSEO";

const route = useRoute();
const router = useRouter();
const query = route.params.query as string; // URL 파라미터에서 검색어 가져오기

const props = defineProps<{
  allAssets?: boolean;
}>();

useSearchSEO(
  computed(() => query),
  "Icons"
);

const page = ref(1);

const { initialData } = await useSsrSearch(query, "icon");
const {
  data: iconData,
  isPlaceholderData,
  isLoading,
} = useIconQuery(
  computed(() => query),
  {
    page,
  }
);

const allIcons = computed(() => {
  if (!iconData.value) {
    const data = initialData.value?.response?.items?.data || [];
    return data.map((d) => {
      return {
        thumb: d.urls.png_256 || "",
        name: d.name,
      };
    });
  }
  return (
    iconData.value?.data.map((d) => {
      return {
        thumb: d.urls.png_256 || "",
        name: d.name,
      };
    }) || []
  );
});

const total = computed(() => iconData.value?.total || 0);

useJsonLdImagesSEO(
  computed(() => query),
  "Icons",
  allIcons
);

onMounted(() => {
  if (route.query.page) {
    page.value = Number(route.query.page);
  }
});

const goPrevPage = () => {
  if (page.value === 1) return;
  page.value -= 1;
  router.push({
    query: {
      page: page.value,
    },
  });
};

const goNextPage = () => {
  if (iconData.value?.currentPage === iconData.value?.lastPage) return;
  page.value += 1;
  router.push({
    query: {
      page: page.value,
    },
  });
};
</script>

<template>
  <SubHeader :count="total" label="Icons" />
  <SubNavBar v-if="!props.allAssets" page="Icons" />
  <section class="container-fluid py-4">
    <div class="d-flex flex-wrap justify-content-start gap-2">
      <article v-for="(icon, i) in allIcons" :key="i">
        <LastCardWrapper
          :link="`/icons/${query}`"
          :is-last-card="props.allAssets && i === allIcons.length - 1"
        >
          <ImageCard
            v-if="icon.thumb"
            :is-loading="isLoading || isPlaceholderData"
            :src="icon.thumb"
            :name="icon.name"
            is-icon
          />
          <span class="sr-only">{{ icon.name }}</span>
        </LastCardWrapper>
      </article>
    </div>
    <PaginationBar
      v-if="!props.allAssets"
      :current-page="iconData?.currentPage || 1"
      :last-page="iconData?.lastPage || 1"
      @prev="goPrevPage"
      @next="goNextPage"
    />
  </section>
</template>
