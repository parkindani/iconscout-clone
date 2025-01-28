<script setup lang="ts">
import { computed } from "vue";
import { useDownloadQuery } from "~/composables/queries/useDownloadQuery";
import BaseCard from "./BaseCard.vue";

const props = defineProps<{
  /**
   * The URL of the Lottie animation file.
   */
  uuid: string;
}>();

const { data, isLoading } = useDownloadQuery(computed(() => props.uuid));

const lottieData = computed(() => JSON.stringify(data.value));
</script>

<template>
  <BaseCard>
    <div v-if="isLoading" class="loading"></div>
    <lottie-player v-else autoplay loop :src="lottieData"></lottie-player>
  </BaseCard>
</template>

<style scoped>
.loading {
  background-color: #d9d9d9;
  height: 200px;
}
</style>
