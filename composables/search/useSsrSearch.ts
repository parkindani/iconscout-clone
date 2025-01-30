import type { AssetType, SearchAssetResponse } from "~/types/api";

export const useSsrSearch = async (
  query: string,
  type: AssetType,
  { limit = ref(10), page = ref(1) } = {}
) => {
  // call first data with ssr
  const { data: initialData } = await useAsyncData(
    `search/${type}?query=${query}`,
    () =>
      $fetch<SearchAssetResponse>(
        `/api/search/${query}?type=${type}&limit=${limit.value}&page=${page.value}`,
        {
          method: "GET",
        }
      ),
    { server: true }
  );

  return { initialData };
};
