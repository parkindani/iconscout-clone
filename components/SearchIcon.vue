<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useSsrSearch } from "~/composables/search/useSsrSearch";
import { useIconQuery } from "~/composables/queries/useSearchQuery";
import { useSearchSEO, useJsonLdImagesSEO } from "~/composables/useSearchSEO";

const route = useRoute();
const query = route.params.query as string; // URL 파라미터에서 검색어 가져오기

useSearchSEO(
  computed(() => query),
  "Icons"
);

const { initialData } = await useSsrSearch(query, "icon");
const { data: iconData } = useIconQuery(
  computed(() => query),
  initialData
);

const allIcons = computed(
  () =>
    iconData.value?.data.map((d) => {
      return {
        thumb: d.urls.png_256 || "",
        name: d.name,
      };
    }) || []
);

useJsonLdImagesSEO(
  computed(() => query),
  "Icons",
  allIcons
);
</script>

<template>
  <section class="container-fluid py-4">
    <div class="d-flex flex-wrap justify-content-start gap-2">
      <article v-for="(icon, i) in allIcons" :key="i">
        <ImageCard
          v-if="icon.thumb"
          :src="icon.thumb"
          :name="icon.name"
          is-icon
        />
        <span class="sr-only">{{ icon.name }}</span>
      </article>
    </div>
  </section>
</template>
