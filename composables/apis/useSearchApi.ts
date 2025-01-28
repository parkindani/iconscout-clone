import { $fetch } from "ofetch";

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

  const {
    items: { data, total, last_page, current_page },
  } = response;

  const uuids = data.map((d: { uuid: string }) => d.uuid);

  return {
    results: uuids,
    total,
    currentPage: current_page,
    lastPage: last_page,
  };
};
