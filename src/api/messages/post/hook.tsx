import { useCallback, useState } from "react";

import type { Message } from "../../../types/Message";
import { useAuthenticatedFetch } from "../../../hooks/useAuthenticatedFetch";
import { MESSAGES_ENDPOINT } from "../constants";

// TODO: Use React Query
export function useMutationMessages() {
  const authFetch = useAuthenticatedFetch();
  const [data, setData] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (message: { content: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await authFetch(MESSAGES_ENDPOINT, {
          method: "POST",
          body: JSON.stringify(message),
        });
        setData(data);
        return data;
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Unknown Error");
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [authFetch]
  );

  return { data, isLoading, error, mutate };
}
