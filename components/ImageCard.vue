<script setup lang="ts">
const props = defineProps<{
  /**
   * The src of the image.
   */
  src: string;
  name?: string;
  isIcon?: boolean;
  isLoading?: boolean;
}>();
</script>

<template>
  <BaseCard :is-icon-card="props.isIcon" :is-loading="props.isLoading">
    <div
      v-if="props.isLoading"
      class="loading"
      :class="{ 'icon-loading': props.isIcon }"
    ></div>
    <img v-else :src="props.src" :alt="props.name || 'Image'" />
  </BaseCard>
</template>

<style scoped>
.loading {
  background-color: #d9d9d9;
  height: 210px;
  width: 280px;
}

.icon-loading {
  height: 140px;
  width: 140px;
}

img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
