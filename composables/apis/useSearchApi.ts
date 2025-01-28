import axios from "axios";
import { $fetch } from "ofetch";

const download_json = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const search = async ({
  keyword,
  limit,
  page,
}: {
  keyword: string;
  limit: number;
  page: number;
}) => {
  const { response } = await $fetch(
    `/api/search/${keyword}?limit=${limit}&page=${page}`,
    {
      method: "GET",
    }
  );

  console.log("USESEARCHAPI::api response:", response);
  const {
    items: { data, total, last_page, current_page },
  } = response;

  const jsons: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await data.forEach(async (d: any) => {
    const url = await $fetch("/api/getDownloadUrl", {
      method: "POST",
      body: JSON.stringify({ uuid: d.uuid }),
    });
    if (url) {
      const json = await download_json(url as string);
      jsons.push(json);
    }
  });

  return {
    results: jsons,
    total,
    currentPage: current_page,
    lastPage: last_page,
  };
};
