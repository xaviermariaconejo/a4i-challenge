import { useCallback, useEffect, useState } from "react";

import type { Message } from "../../../types/Message";
import { useAuthenticatedFetch } from "../../../hooks/useAuthenticatedFetch";
import { MESSAGES_ENDPOINT } from "../constants";

// TODO: Use React Query
export function useGetMessages() {
  const authFetch = useAuthenticatedFetch();
  const [data, setData] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await authFetch(MESSAGES_ENDPOINT);
      setData(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unknown Error");
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, isLoading, error, refetch: fetch };
}
