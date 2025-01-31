<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useIllustrationQuery } from "~/composables/queries/useSearchQuery";
import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useSearchSEO, useJsonLdImagesSEO } from "~/composables/useSearchSEO";

const route = useRoute();
const query = route.params.query as string; // bring search keyword from URL

useSearchSEO(
  computed(() => query),
  "Illustrations"
);

const { initialData } = await useSsrSearch(query, "illustration");
const { data: illustrations } = useIllustrationQuery(
  computed(() => query),
  initialData
);

const allIllustrations = computed(
  () =>
    illustrations.value?.data.map((d) => {
      return {
        thumb: d.urls?.thumb || "",
        name: d.name,
      };
    }) || []
);

useJsonLdImagesSEO(
  computed(() => query),
  "Illustrations",
  allIllustrations
);
</script>

<template>
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
  </section>
</template>
