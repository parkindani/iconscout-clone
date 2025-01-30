<script setup lang="ts">
import { ref, computed } from "vue";
import TheHeader from "~/components/TheHeader.vue";
import {
  useLottieQuery,
  use3DQuery,
  useIconQuery,
  useIllustrationQuery,
} from "~/composables/queries/useSearchQuery";

const keyword = ref("");

const {
  data: lottieData,
  fetchNextPage,
  // hasNextPage,
} = useLottieQuery(computed(() => keyword.value));

const { data: threeDData } = use3DQuery(computed(() => keyword.value));
const { data: iconData } = useIconQuery(computed(() => keyword.value));
const { data: illustrationData } = useIllustrationQuery(
  computed(() => keyword.value)
);

const allUuids = computed(() =>
  lottieData.value?.pages.flatMap((page) => page.data.map((d) => d.uuid) || [])
);

const all3DThumbnails = computed(() =>
  threeDData.value?.data.map((d) => d.urls.thumb)
);

const allIconThumbnails = computed(() =>
  iconData.value?.data.map((d) => d.urls.png_256)
);

const allIllustrationThumbnails = computed(() =>
  illustrationData.value?.data.map((d) => d.urls.thumb)
);

const submit = (val: string) => {
  keyword.value = val;
  fetchNextPage();
};
</script>

<template>
  <div>
    <TheHeader @submit="submit" />

    <main class="flex-grow-1 bg-light">
      <!-- Search Results -->

      <h2>{{ keyword }} 3D Illustrations</h2>
      <div class="container-fluid py-4">
        <BRow>
          <BCol
            v-for="(thumb, i) in all3DThumbnails"
            :key="i"
            cols="12"
            sm="6"
            lg="4"
            class="mb-4"
          >
            <ClientOnly>
              <ImageCard v-if="thumb" :src="thumb" />
            </ClientOnly>
          </BCol>
        </BRow>
      </div>

      <h2>{{ keyword }} Animations</h2>
      <div class="container-fluid py-4">
        <BRow>
          <BCol
            v-for="(uuid, i) in allUuids"
            :key="i"
            cols="12"
            sm="6"
            lg="4"
            class="mb-4"
          >
            <ClientOnly>
              <LottieCard :uuid="uuid" />
            </ClientOnly>
          </BCol>
        </BRow>
      </div>

      <h2>{{ keyword }} Illustrations</h2>
      <div class="container-fluid py-4">
        <BRow>
          <BCol
            v-for="(thumb, i) in allIllustrationThumbnails"
            :key="i"
            cols="12"
            sm="6"
            lg="4"
            class="mb-4"
          >
            <ClientOnly>
              <ImageCard v-if="thumb" :src="thumb" />
            </ClientOnly>
          </BCol>
        </BRow>
      </div>

      <h2>{{ keyword }} Icons</h2>
      <div class="container-fluid py-4">
        <BRow>
          <BCol
            v-for="(thumb, i) in allIconThumbnails"
            :key="i"
            cols="12"
            sm="6"
            lg="4"
            class="mb-4"
          >
            <ClientOnly>
              <ImageCard v-if="thumb" :src="thumb" />
            </ClientOnly>
          </BCol>
        </BRow>
      </div>
    </main>

    <TheFooter />
  </div>
</template>
