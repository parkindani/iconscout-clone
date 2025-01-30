<script setup lang="ts">
import { computed } from "vue";
import { useDownloadQuery } from "~/composables/queries/useDownloadQuery";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

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
    <template v-if="isLoading">
      <div class="loading"></div>
    </template>
    <template v-else>
      <ClientOnly>
        <DotLottieVue autoplay loop :data="lottieData"></DotLottieVue>
      </ClientOnly>
    </template>
  </BaseCard>
</template>
