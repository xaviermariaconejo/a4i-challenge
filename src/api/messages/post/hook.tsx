import { useCallback, useState } from "react";

import { useApi } from "../../../context/Api/hook";
import type { Message } from "../../../types/Message";

import { updateMessages } from "./fetch";

// TODO: Use React Query
export function useMutationMessages() {
  const { key } = useApi();
  const [data, setData] = useState<Message | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (message: { content: string }) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await updateMessages(message, {
          headers: { "x-api-key": key },
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
    [key]
  );

  return { data, isLoading, error, mutate };
}
