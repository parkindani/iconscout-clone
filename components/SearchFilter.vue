<script setup lang="ts">
import type { PageNameType } from "~/types";

import { useRoute, useRouter } from "vue-router";

import { ref, watch, computed } from "vue";
import { pageList } from "~/assets/constants";

const route = useRoute();
const router = useRouter();
const keyword = route.params.query as string; // bring search keyword from URL

const props = defineProps<{
  page?: PageNameType;
}>();

const selectedAsset = ref("All Assets");
const selectedPrice = ref("all");
const sortBy = ref("relevant");

const isLottiePage = computed(() => {
  return props.page === "Lottie Animations" || props.page === "Dot Lottie";
});

watch(
  () => props.page,
  (newVal) => {
    if (newVal) {
      selectedAsset.value = newVal;
      if (newVal === "Lottie Animations" || newVal === "Dot Lottie") {
        selectedPrice.value = "free";
      }
    }
  },
  {
    immediate: true,
  }
);

watch(
  () => selectedAsset.value,
  (title) => {
    const page = pageList[title as PageNameType];
    if (page === props.page) {
      return;
    }
    if (page) {
      router.push({
        path: `${page}/${encodeURIComponent(keyword)}`,
        query: {
          ...route.query,
          page: 1,
          ...(page === "Lottie Animations" || page === "Dot Lottie"
            ? { price: "free" }
            : {}),
        },
      });
    }
  }
);

watch(
  () => route.query.sort,
  (sort) => {
    if (sort) {
      sortBy.value = sort as string;
    }
  },
  {
    immediate: true,
  }
);

watch(sortBy, (sort) => {
  if (sort === route.query.sort) {
    return;
  }

  router.push({
    query: {
      ...route.query,
      page: 1,
      sort,
    },
  });
});

watch(
  () => route.query.price,
  (price) => {
    if (price) {
      selectedPrice.value = price as string;
    }
  },
  {
    immediate: true,
  }
);

watch(selectedPrice, (price) => {
  if (price === route.query.price) {
    return;
  }

  router.push({
    query: {
      ...route.query,
      page: 1,
      price,
    },
  });
});
</script>

<template>
  <div class="search-filter">
    <!-- Asset Type -->
    <b-form-group label="Asset">
      <b-form-radio-group v-model="selectedAsset" name="asset-type" stacked>
        <b-form-radio size="sm" value="All Assets">All asset</b-form-radio>
        <b-form-radio size="sm" value="3D Illustrations"
          >3D Illustrations</b-form-radio
        >
        <b-form-radio size="sm" value="Lottie Animations"
          >Lottie Animations</b-form-radio
        >
        <b-form-radio size="sm" value="Illustrations"
          >Illustrations</b-form-radio
        >
        <b-form-radio size="sm" value="Icons">Icons</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <!-- Price -->
    <b-form-group label="Price">
      <b-form-radio-group v-model="selectedPrice" name="price-type" stacked>
        <b-form-radio size="sm" value="free">Free</b-form-radio>
        <b-form-radio size="sm" :disabled="isLottiePage" value="premium"
          >Premium</b-form-radio
        >
        <b-form-radio size="sm" :disabled="isLottiePage" value="all"
          >All</b-form-radio
        >
      </b-form-radio-group>
    </b-form-group>

    <!-- Sort By -->
    <b-form-group label="Sort by">
      <b-form-radio-group v-model="sortBy" name="sort-by" stacked>
        <b-form-radio size="sm" value="relevant">Relevant</b-form-radio>
        <b-form-radio size="sm" value="popular">Popular</b-form-radio>
        <b-form-radio size="sm" value="latest">Latest</b-form-radio>
      </b-form-radio-group>
    </b-form-group>
  </div>
</template>

<style lang="scss" scoped>
.search-filter {
  background-color: transparent;
  min-width: 260px;
  font-size: 14px;
  line-height: 17.3px;
  border-right: #ebedf5 1px solid;

  fieldset {
    padding: 20px 24px;
    border-bottom: #ebedf5 1px solid;
    font-weight: 400;

    :deep(legend) {
      font-weight: 600;
    }

    :deep(.form-check-label) {
      padding-top: 2px;
    }
  }
}
</style>
