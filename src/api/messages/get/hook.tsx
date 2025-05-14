import { useCallback, useEffect, useState } from "react";
import { getMessages } from "./fetch";
import type { Message } from "../../../types/Message";

// TODO: Use React Query
export function useGetMessages() {
  const [data, setData] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMessages();
      setData(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unknown Error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, isLoading, error, refetch: fetch };
}
