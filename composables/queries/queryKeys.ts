export const searchKey = {
  all: ["search"] as const,
  threeDimensional: (query: string, limit: number, page: number) =>
    [[...searchKey.all], "threeDimensional", query, limit, page] as const,
  lottie: (query: string, limit: number) =>
    [[...searchKey.all], "lottie", query, limit] as const,
  illustration: (query: string, limit: number, page: number) =>
    [[...searchKey.all], "illustration", query, limit, page] as const,
  icon: (query: string, limit: number, page: number) =>
    [[...searchKey.all], "icon", query, limit, page] as const,
};

export const downloadKey = {
  all: ["download"] as const,
  asset: (url: string) => [[...downloadKey.all], "asset", url] as const,
};
