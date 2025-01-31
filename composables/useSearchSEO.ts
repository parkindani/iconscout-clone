import { computed } from "vue";

export const useSearchSEO = (query: Ref<string>, type: string) => {
  useHead({
    title: computed(() => `${query.value} ${type} | IconScout`),
    meta: [
      {
        name: "description",
        content: computed(
          () =>
            `Find the best results for ${query.value} and download millions of high-quality ${type} for your projects. Enhance your designs with our extensive library of creative assets.`
        ),
      },
      {
        name: "keywords",
        content: computed(() => `${query.value}, ${type}`),
      },
      { property: "og:site_name", content: "Iconscout" },
      { property: "og:type", content: "website" },
      { name: "robots", content: "index, follow" },
    ],
  });
};
