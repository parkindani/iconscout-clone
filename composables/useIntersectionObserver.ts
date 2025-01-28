import { onBeforeUnmount, onMounted, ref } from "vue";

interface UseIntersectionObserverArgs {
  onIntersect?: (isIntersecting: boolean) => void;
  threshold?: number;
}

/**
 * @description
 * A composable function that uses the Intersection Observer API to detect when an element is in view.
 */
export const useIntersectionObserver = ({
  onIntersect,
  threshold = 0.5,
}: UseIntersectionObserverArgs = {}) => {
  const $targetRef = ref<HTMLElement | null>(null);
  const observer = ref<IntersectionObserver | null>(null);
  const isIntersecting = ref(false);

  onMounted(() => {
    if (!$targetRef.value) return;

    observer.value = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersecting.value = !!entry?.isIntersecting;
        onIntersect?.(isIntersecting.value);
      },
      { threshold }
    );

    observer.value.observe($targetRef.value!);
  });

  onBeforeUnmount(() => {
    if (observer.value) {
      observer.value.disconnect();
    }
  });

  return { $targetRef, isIntersecting };
};
