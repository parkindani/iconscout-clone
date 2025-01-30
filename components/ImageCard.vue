<script setup lang="ts">
import BaseCard from "./BaseCard.vue";
const props = defineProps<{
  /**
   * The src of the image.
   */
  src: string;
  name?: string;
  isIcon?: boolean;
}>();
</script>

<template>
  <BaseCard :is-icon-card="props.isIcon">
    <img :src="props.src" :alt="props.name || 'Image'" />
  </BaseCard>
</template>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
