<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { use3DQuery } from "~/composables/queries/useSearchQuery";
import { useSearchSEO, useJsonLdImagesSEO } from "~/composables/useSearchSEO";

const route = useRoute();
const query = route.params.query as string; // bring search keyword from URL

const props = defineProps<{
  hideSubNavBar?: boolean;
}>();

useSearchSEO(
  computed(() => query),
  "3D Illustrations"
);

const { initialData } = await useSsrSearch(query, "3d");
const { data: threeDData } = use3DQuery(
  computed(() => query),
  initialData
);

const all3DThumbnails = computed(
  () =>
    threeDData.value?.data.map((d) => {
      return {
        thumb: d.urls?.thumb || "",
        name: d.name,
      };
    }) || []
);

const total = computed(() => threeDData.value?.total || 0);

useJsonLdImagesSEO(
  computed(() => query),
  "3D Illustrations",
  all3DThumbnails
);
</script>

<template>
  <SubHeader :count="total" label="3D Illustrations" />
  <SubNavBar v-if="!props.hideSubNavBar" page="3D Illustrations" />
  <section class="container-fluid py-4">
    <div
      role="region"
      aria-label="3D animations search results"
      class="d-flex flex-wrap justify-content-start gap-2"
    >
      <article v-for="(thumbnail, i) in all3DThumbnails" :key="i">
        <ImageCard
          v-if="thumbnail.thumb"
          :src="thumbnail.thumb"
          :name="thumbnail.name"
        />
        <span class="sr-only">{{ thumbnail.name }}</span>
      </article>
    </div>
  </section>
</template>
