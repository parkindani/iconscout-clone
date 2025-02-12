import type { SearchAssetRequestQuery, SearchAssetResponse } from "~/types/api";

import { $fetch } from "ofetch";

export const search = async ({
  keyword,
  limit,
  page,
  type,
  price,
  sort,
}: SearchAssetRequestQuery & {
  keyword: string;
}) => {
  const { response } = await $fetch<SearchAssetResponse>(
    `/api/search/${keyword}`,
    {
      method: "GET",
      query: {
        type,
        limit,
        page,
        sort,
        ...(price !== "all" && { price }),
      },
    }
  );

  const {
    items: { data, total, last_page, current_page },
  } = response;

  return {
    data,
    total,
    currentPage: current_page,
    lastPage: last_page,
  };
};
