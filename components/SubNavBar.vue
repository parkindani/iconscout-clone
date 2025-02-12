<script setup lang="ts">
import type { PageNameType } from "~/types";

import { useRoute, useRouter } from "vue-router";
import { useShowFilter } from "~/composables/useShowFilter";
import { pageList } from "~/assets/constants";
import { SvgoIcoFilter } from "#components";

const props = defineProps<{
  page?: PageNameType;
}>();

const route = useRoute();
const router = useRouter();

const { isShowFilter, setFalse, setTrue } = useShowFilter();

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
    <button
      v-if="props.page !== 'All Assets'"
      class="filter-btn"
      :class="isShowFilter && 'expanded'"
    >
      <div @click="setTrue">
        <SvgoIcoFilter filled :fontControlled="false" class="ico-filter" />
        Filters
      </div>
      <SvgoIcoClose
        v-if="isShowFilter"
        @click="setFalse"
        filled
        :fontControlled="false"
        class="ico-close"
      />
    </button>

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
  border-bottom: #ebedf5 1px solid;
  padding: 0 20px;
}

.filter-btn {
  background-color: transparent;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  padding-top: 15px;
  color: #2e334c;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;

  .ico-filter {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .ico-close {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
}

.expanded {
  width: 240px;
  border-right: #ebedf5 1px solid;
}
</style>
