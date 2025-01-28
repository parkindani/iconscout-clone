import { type Ref, computed } from "vue";
import { search } from "../apis/useSearchApi";
import { useInfiniteQuery } from "@tanstack/vue-query";
import { searchKey } from "./queryKeys";

export const useLottieQuery = (
  keyword: Ref<string>,
  { limit = ref(10) } = {}
) => {
  return useInfiniteQuery({
    queryKey: computed(() => searchKey.lottie(keyword.value, limit.value)),
    queryFn: async ({ pageParam }: { pageParam: number }) =>
      search({ keyword: keyword.value, limit: limit.value, page: pageParam }),
    enabled: !!keyword.value,
    staleTime: 1000 * 60 * 5,
    getNextPageParam: ({ currentPage, lastPage }) => {
      if (currentPage === lastPage) return undefined;
      return currentPage + 1;
    },
    initialPageParam: 1,
  });
};
