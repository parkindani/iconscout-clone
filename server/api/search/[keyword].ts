import axios from "axios";

const SEARCH_API_ENDPOINT = "https://api.iconscout.com/v3/search";

export const search = async ({
  keyword,
  clientKey,
  limit,
  page,
}: {
  keyword: string;
  clientKey: string;
  limit: number;
  page: number;
}) => {
  try {
    const response = await axios.get(SEARCH_API_ENDPOINT, {
      params: {
        query: keyword,
        product_type: "item",
        asset: "lottie",
        price: "free",
        per_page: limit,
        page: page,
        sort: "relevant",
      },
      headers: {
        "Client-ID": clientKey,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default defineEventHandler<{ query: { limit: string; page: string } }>(
  async (event) => {
    const config = useRuntimeConfig();

    const CLIENT_KEY = config.clientId;

    const keyword = getRouterParam(event, "keyword");
    const { limit, page } = getQuery(event);

    if (!keyword) return;

    const res = await search({
      keyword,
      clientKey: CLIENT_KEY,
      limit: Number(limit),
      page: Number(page),
    });

    return res;
  }
);
