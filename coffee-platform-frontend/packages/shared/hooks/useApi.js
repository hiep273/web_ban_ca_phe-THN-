import { useCallback, useEffect, useState } from "react";

export function useApi(request, options = {}) {
  const { immediate = true, initialData = null } = options;
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(immediate);

  const execute = useCallback(
    async (...args) => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await request(...args);
        const payload = response?.data ?? response;
        setData(payload);
        return payload;
      } catch (requestError) {
        setError(requestError);
        throw requestError;
      } finally {
        setIsLoading(false);
      }
    },
    [request]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, error, execute, isLoading };
}
