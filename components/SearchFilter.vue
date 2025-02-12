<script setup lang="ts">
import { ref } from "vue";

const selectedAsset = ref("all");
const selectedPrice = ref("all");
const sortBy = ref("popular");
</script>

<template>
  <div class="search-filter">
    <!-- Asset Type -->
    <b-form-group label="Asset">
      <b-form-radio-group v-model="selectedAsset" name="asset-type" stacked>
        <b-form-radio size="sm" value="all">All asset</b-form-radio>
        <b-form-radio size="sm" value="3d">3D Illustrations</b-form-radio>
        <b-form-radio size="sm" value="lottie">Lottie Animations</b-form-radio>
        <b-form-radio size="sm" value="illustrations"
          >Illustrations</b-form-radio
        >
        <b-form-radio size="sm" value="icons">Icons</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <!-- Price -->
    <b-form-group label="Price">
      <b-form-radio-group v-model="selectedPrice" name="price-type" stacked>
        <b-form-radio size="sm" value="free">Free</b-form-radio>
        <b-form-radio size="sm" value="premium">Premium</b-form-radio>
        <b-form-radio size="sm" value="all">All</b-form-radio>
      </b-form-radio-group>
    </b-form-group>

    <!-- Sort By -->
    <b-form-group label="Sort by">
      <b-form-radio-group v-model="sortBy" name="sort-by" stacked>
        <b-form-radio size="sm" value="popular">Popular</b-form-radio>
        <b-form-radio size="sm" value="latest">Latest</b-form-radio>
        <b-form-radio size="sm" value="featured">Featured</b-form-radio>
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
