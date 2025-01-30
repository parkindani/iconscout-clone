<script setup lang="ts">
import type { PageNameType } from "~/types";

import { useRoute, useRouter } from "vue-router";
import { pageList } from "~/assets/constants";

const props = defineProps<{
  page?: PageNameType;
}>();

const route = useRoute();
const router = useRouter();

const dropdownList = Object.keys(pageList);

const onClick = (title: string) => {
  const page = pageList[title as PageNameType];

  if (page === props.page) {
    return;
  }
  if (page) {
    router.push(`${page}/${encodeURIComponent(route.params.query as string)}`);
  }
};
</script>

<template>
  <div class="sub-navbar">
    <base-tab-button
      v-for="(title, tIdx) in dropdownList"
      :key="tIdx"
      :title="title"
      :active="title === props.page"
      @click="onClick(title)"
    />
  </div>
</template>

<style lang="scss" scoped>
.sub-navbar {
  position: sticky;
  display: flex;
  top: 62px;
  z-index: 900;
  background-color: #fafafc;
  column-gap: 23px;
}
</style>
