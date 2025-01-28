export const searchKey = {
  all: ["search"] as const,
  threeDimensional: (query: string, limit: number) =>
    [[...searchKey.all], "threeDimensional", query, limit] as const,
  lottie: (query: string, limit: number) =>
    [[...searchKey.all], "lottie", limit, query] as const,
  illustration: (query: string) =>
    [[...searchKey.all], "illustration", query] as const,
  icon: (query: string) => [[...searchKey.all], "icon", query] as const,
};

export const downloadKey = {
  all: ["download"] as const,
  asset: (uuid: string) => [[...downloadKey.all], "asset", uuid] as const,
};
