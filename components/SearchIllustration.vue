<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useIllustrationQuery } from "~/composables/queries/useSearchQuery";
import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useSearchSEO } from "~/composables/useSearchSEO";

useSearchSEO(
  computed(() => query),
  "Illustrations"
);

const route = useRoute();
const query = route.params.query as string; // bring search keyword from URL

const { initialData } = await useSsrSearch(query, "illustration");
const { data: illustrations } = useIllustrationQuery(
  computed(() => query),
  initialData
);

const allIllustrationThumbnails = computed(() =>
  illustrations.value?.data.map((d) => d.urls.thumb)
);
</script>

<template>
  <section class="container-fluid py-4">
    <div class="d-flex flex-wrap justify-content-start gap-2">
      <article v-for="(thumb, i) in allIllustrationThumbnails" :key="i">
        <ImageCard v-if="thumb" :src="thumb" />
      </article>
    </div>
  </section>
</template>
