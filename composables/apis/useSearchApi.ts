import type { SearchAssetRequestQuery, SearchAssetResponse } from "~/types/api";

import { $fetch } from "ofetch";

export const search = async ({
  keyword,
  limit,
  page,
  type,
}: SearchAssetRequestQuery & {
  keyword: string;
}) => {
  const { response } = await $fetch<SearchAssetResponse>(
    `/api/search/${keyword}?type=${type}&limit=${limit}&page=${page}`,
    {
      method: "GET",
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
