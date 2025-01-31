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

export const useJsonLdImagesSEO = (
  query: Ref<string>,
  type: string,
  imageData: Ref<{ thumb: string; name: string }[]>
) => {
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          mainEntity: imageData.value.map((image, index) => ({
            "@type": "ImageObject",
            url: image.thumb,
            name: image.name,
            position: index + 1,
          })),
          headline: `Search ${type} results for ${query.value}`,
        }),
      },
    ],
  });
};

export const useJsonLdLottieSEO = (
  query: Ref<string>,
  lottieData: Ref<{ uuid: string; name: string }[]>
) => {
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SearchResultsPage",
          mainEntity: lottieData.value.map((lottie, index) => ({
            name: lottie.name,
            position: index + 1,
          })),
          headline: `Search lottie animation results for ${query.value}`,
        }),
      },
    ],
  });
};
