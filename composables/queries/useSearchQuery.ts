import { type Ref, computed } from "vue";
import { search } from "../apis/useSearchApi";
import { useQuery, useInfiniteQuery } from "@tanstack/vue-query";
import { searchKey } from "./queryKeys";

export const useLottieQuery = (
  keyword: Ref<string>,
  onlyFirstPage?: boolean,
  { limit = ref(10) } = {}
) => {
  return useInfiniteQuery({
    queryKey: computed(() => searchKey.lottie(keyword.value, limit.value)),
    queryFn: ({ pageParam }: { pageParam: number }) =>
      search({
        type: "lottie",
        keyword: keyword.value,
        limit: limit.value,
        page: pageParam,
      }),
    enabled: computed(() => !!keyword.value),
    staleTime: 1000 * 60 * 5,
    getNextPageParam: ({ currentPage, lastPage }) => {
      if (onlyFirstPage) return undefined;
      if (currentPage === lastPage) return undefined;
      return currentPage + 1;
    },
    initialPageParam: 1,
  });
};

export const useIllustrationQuery = (
  keyword: Ref<string>,
  { limit = ref(10), page = ref(1) } = {}
) => {
  return useQuery({
    queryKey: computed(() =>
      searchKey.illustration(keyword.value, limit.value)
    ),
    queryFn: () =>
      search({
        type: "illustration",
        keyword: keyword.value,
        limit: limit.value,
        page: page.value,
      }),
    enabled: computed(() => !!keyword.value),
    staleTime: 1000 * 60 * 5,
  });
};

export const use3DQuery = (
  keyword: Ref<string>,
  { limit = ref(10), page = ref(1) } = {}
) => {
  return useQuery({
    queryKey: computed(() =>
      searchKey.threeDimensional(keyword.value, limit.value)
    ),
    queryFn: () =>
      search({
        type: "3d",
        keyword: keyword.value,
        limit: limit.value,
        page: page.value,
      }),
    enabled: computed(() => !!keyword.value),
    staleTime: 1000 * 60 * 5,
  });
};

export const useIconQuery = (
  keyword: Ref<string>,
  { limit = ref(10), page = ref(1) } = {}
) => {
  return useQuery({
    queryKey: computed(() => searchKey.icon(keyword.value, limit.value)),
    queryFn: () =>
      search({
        type: "icon",
        keyword: keyword.value,
        limit: limit.value,
        page: page.value,
      }),
    enabled: computed(() => !!keyword.value),
    staleTime: 1000 * 60 * 5,
  });
};
