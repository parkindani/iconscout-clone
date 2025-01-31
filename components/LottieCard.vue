<script setup lang="ts">
import { computed } from "vue";
import { useDownloadQuery } from "~/composables/queries/useDownloadQuery";
import BaseCard from "./BaseCard.vue";

const props = defineProps<{
  /**
   * The uuid of the Lottie animation file.
   */
  uuid: string;
}>();

const { data, isLoading } = useDownloadQuery(computed(() => props.uuid));

const lottieData = computed(() => JSON.stringify(data.value));
</script>

<template>
  <BaseCard is-lottie>
    <template v-if="isLoading">
      <div class="loading"></div>
    </template>
    <template v-else>
      <ClientOnly>
        <div class="lottie-container">
          <lottie-player autoplay loop :src="lottieData"></lottie-player>
        </div>
      </ClientOnly>
    </template>
  </BaseCard>
</template>

<style scoped>
.loading {
  background-color: #d9d9d9;
  height: 210px;
  width: 280px;
}

.lottie-container {
  height: 210px;
  width: 280px;
  padding: 8px 12px;
}
</style>
