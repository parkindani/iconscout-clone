import type { Ref } from "vue";

import { useQuery } from "@tanstack/vue-query";
import { downloadJson } from "../apis/useDownloadApi";
import { downloadKey } from "./queryKeys";

export const useDownloadQuery = (url: Ref<string>) => {
  return useQuery({
    queryKey: downloadKey.asset(url.value),
    queryFn: () => downloadJson(url.value),
    staleTime: 1000 * 60 * 5,
    enabled: !!url.value,
  });
};
