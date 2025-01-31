import { type Ref, computed } from "vue";

import type { SearchAssetResponse } from "~/types/api";

import { search } from "../apis/useSearchApi";
import {
  useQuery,
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/vue-query";
import { searchKey } from "./queryKeys";

export const useLottieQuery = (
  keyword: Ref<string>,
  initial: Ref<SearchAssetResponse | null>,
  onlyFirstPage?: boolean,
  { limit = ref(20) } = {}
) => {
  let initialDataPage = null;

  if (initial?.value) {
    const {
      response: {
        items: { data, total, last_page, current_page },
      },
    } = initial.value;
    initialDataPage = {
      data,
      total,
      lastPage: last_page,
      currentPage: current_page,
    };
  }

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
    ...(initialDataPage && {
      initialData: { pages: [initialDataPage], pageParams: [1] },
    }),
  });
};

export const useIllustrationQuery = (
  keyword: Ref<string>,
  initial: Ref<SearchAssetResponse | null>,
  { limit = ref(20), page = ref(1) } = {}
) => {
  let initialData = null;

  if (initial.value) {
    const {
      response: {
        items: { data, total, last_page, current_page },
      },
    } = initial.value;
    initialData = {
      data,
      total,
      lastPage: last_page,
      currentPage: current_page,
    };
  }

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
    ...(initialData && { initialData }),
  });
};

export const use3DQuery = (
  keyword: Ref<string>,
  { limit = ref(20), page = ref(1) } = {}
) => {
  return useQuery({
    queryKey: computed(() =>
      searchKey.threeDimensional(keyword.value, limit.value, page.value)
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
    placeholderData: keepPreviousData,
  });
};

export const useIconQuery = (
  keyword: Ref<string>,
  initial: Ref<SearchAssetResponse | null>,
  { limit = ref(20), page = ref(1) } = {}
) => {
  let initialData = null;

  if (initial.value) {
    const {
      response: {
        items: { data, total, last_page, current_page },
      },
    } = initial.value;
    initialData = {
      data,
      total,
      lastPage: last_page,
      currentPage: current_page,
    };
  }

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
    ...(initialData && { initialData }),
  });
};
