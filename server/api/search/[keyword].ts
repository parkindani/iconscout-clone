import axios from "axios";

const SEARCH_API_ENDPOINT = "https://api.iconscout.com/v3/search";

export const search = async ({
  keyword,
  clientKey,
}: {
  keyword: string;
  clientKey: string;
}) => {
  try {
    const response = await axios.get(SEARCH_API_ENDPOINT, {
      params: {
        query: keyword,
        product_type: "item",
        asset: "lottie",
        price: "free",
        per_page: 10,
        page: 1,
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

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const CLIENT_KEY = config.clientId;

  const keyword = getRouterParam(event, "keyword");

  if (!keyword) return;

  const res = await search({
    keyword,
    clientKey: CLIENT_KEY,
  });

  return res;
});
