<script setup lang="ts">
import BaseCard from './BaseCard.vue'

const props = defineProps<
  {
    /**
     * The URL of the Lottie animation file.
     */
    src: string
  }>()
</script>

<template>
  <BaseCard>
    <lottie-player autoplay loop :src="props.src"></lottie-player>
  </BaseCard>
</template>