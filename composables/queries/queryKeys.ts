export const searchKey = {
  all: ["search"] as const,
  threeDimensional: (
    query: string,
    limit: number,
    page: number,
    price: string,
    sort: string
  ) =>
    [
      [...searchKey.all],
      "threeDimensional",
      query,
      limit,
      page,
      price,
      sort,
    ] as const,
  lottie: (query: string, limit: number, sort: string) =>
    [[...searchKey.all], "lottie", query, limit, sort] as const,
  illustration: (
    query: string,
    limit: number,
    page: number,
    price: string,
    sort: string
  ) =>
    [
      [...searchKey.all],
      "illustration",
      query,
      limit,
      page,
      price,
      sort,
    ] as const,
  icon: (
    query: string,
    limit: number,
    page: number,
    price: string,
    sort: string
  ) => [[...searchKey.all], "icon", query, limit, page, price, sort] as const,
};

export const downloadKey = {
  all: ["download"] as const,
  asset: (url: string) => [[...downloadKey.all], "asset", url] as const,
};
