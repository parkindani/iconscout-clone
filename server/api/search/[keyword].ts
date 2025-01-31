import axios from "axios";
import type { SearchAssetRequestQuery, SearchAssetResponse } from "~/types/api";

const SEARCH_API_ENDPOINT = "https://api.iconscout.com/v3/search";

export const search = async ({
  type,
  keyword,
  clientKey,
  limit,
  page,
}: SearchAssetRequestQuery & {
  keyword: string;
  clientKey: string;
}): Promise<SearchAssetResponse> => {
  const response = await axios.get(SEARCH_API_ENDPOINT, {
    params: {
      query: keyword,
      product_type: "item",
      asset: type,
      price: type === "lottie" ? "free" : undefined,
      per_page: limit,
      page: page,
      sort: "relevant",
    },
    headers: {
      "Client-ID": clientKey,
    },
  });
  const { data } = response;
  return data || {};
};

export default defineEventHandler<{
  query: SearchAssetRequestQuery;
}>(async (event) => {
  const config = useRuntimeConfig();

  const CLIENT_KEY = config.clientId;

  const keyword = getRouterParam(event, "keyword");
  const { limit, page, type } = getQuery(event);

  if (!keyword) return;

  const res = await search({
    type,
    keyword,
    limit,
    page,
    clientKey: CLIENT_KEY,
  });

  return res;
});
