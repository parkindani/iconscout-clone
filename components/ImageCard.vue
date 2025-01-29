<script setup lang="ts">
import BaseCard from "./BaseCard.vue";
const props = defineProps<{
  /**
   * The src of the image.
   */
  src: string;
  name?: string;
}>();
</script>

<template>
  <BaseCard>
    <img :src="props.src" :alt="props.name || 'Image'" />
  </BaseCard>
</template>
