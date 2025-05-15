import { useCallback, useEffect, useState } from "react";

import { useApi } from "../../../context/Api/hook";
import type { Message } from "../../../types/Message";

import { getMessages } from "./fetch";

// TODO: Use React Query
export function useGetMessages() {
  const { key } = useApi();
  const [data, setData] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMessages({ headers: { "x-api-key": key } });
      setData(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unknown Error");
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, isLoading, error, refetch: fetch };
}
