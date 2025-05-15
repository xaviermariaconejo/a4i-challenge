import { useCallback } from "react";
import { API_URL, HEADER_API_KEY } from "../../config/constants";
import { useApi } from "../../context/Api/hook";

export type Fetcher = <T = any>(
  endpoint: string,
  options?: RequestInit
) => Promise<T>;

export function useAuthenticatedFetch(): Fetcher {
  const { key } = useApi();

  const authFetch: Fetcher = useCallback(
    async (endpoint, options = {}) => {
      const url = `${API_URL}${endpoint}`;
      const res = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          [HEADER_API_KEY]: key,
          ...options.headers,
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }

      return res.json();
    },
    [key]
  );

  return authFetch;
}
