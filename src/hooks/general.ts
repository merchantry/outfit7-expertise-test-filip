import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

export function useRouteParam(paramName: string) {
  const route = useRoute();

  return computed<string | undefined>(() =>
    paramName in route.params ? String(route.params[paramName]) : undefined
  );
}

export function useRouteQuery(queryName: string) {
  const route = useRoute();

  return computed<string | undefined>(() =>
    queryName in route.query ? String(route.query[queryName]) : undefined
  );
}

type QueryConfig = {
  noAutoRefetch?: boolean;
};

export function useQuery<T>(fn: () => Promise<T> | T, config?: QueryConfig) {
  const { noAutoRefetch = false } = config || {};

  const data = ref<T | null>(null);
  const error = ref<Error | null>(null);
  const isLoading = ref(true);
  const isFetchedOnce = ref(false);

  async function fetchData() {
    try {
      isLoading.value = true;

      data.value = await fn();
      isFetchedOnce.value = true;
    } catch (err) {
      error.value = err as Error;
    } finally {
      isLoading.value = false;
    }
  }

  watchEffect(() => {
    if (noAutoRefetch && isFetchedOnce.value) return;

    fetchData();
  });

  return { data, error, isLoading, refetch: fetchData };
}

export function useDebouncedCallback<
  A extends unknown[],
  T extends (...args: A) => void
>(fn: T, delay: number): T {
  const timeout = ref<number | null>(null);

  return function (...args: A) {
    if (timeout.value) clearTimeout(timeout.value);
    timeout.value = setTimeout(() => {
      fn(...args);
    }, delay);
  } as T;
}
