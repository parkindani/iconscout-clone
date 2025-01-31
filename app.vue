<script setup lang="ts">
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";

// eslint-disable-next-line no-undef
useHead({
  title:
    "Download 10.3 Million+ Icons, Illustrations, 3D Illustrations, and Lottie Animations | IconScout",
  meta: [
    {
      name: "description",
      content:
        "Discover and download millions of high-quality icons, illustrations, 3D illustrations, and Lottie animations for your projects. Enhance your designs with our extensive library of creative assets.",
    },
    {
      name: "keywords",
      content:
        "lottie animations, icons, illustrations, 3d illustrations, dotlottie, lottie",
    },
    { property: "og:site_name", content: "Iconscout" },
    { property: "og:type", content: "website" },
    { name: "robots", content: "index, follow" }, // Allow indexing by search engines
  ],
});
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <VueQueryDevtools />
  </div>
</template>
