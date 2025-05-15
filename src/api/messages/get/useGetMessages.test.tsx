import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { act, waitFor } from "@testing-library/react";
import { renderHookWithProviders } from "../../../tests/render";
import { useGetMessages } from "./hook";
import { MESSAGES_ENDPOINT } from "../constants";
import type { Message } from "../../../types/Message";
import { API_URL, HEADER_API_KEY, API_KEY } from "../../../config/constants";

describe("useGetMessages", () => {
  beforeEach(() => {
    // TODO: Improve integrating MSW
    vi.stubGlobal("fetch", vi.fn());
  });

  it("fetches messages on mount and updates state on success", async () => {
    const fakeMessages: Message[] = [
      { id: 1, content: "foo", type: "agentMessage" },
      { id: 2, content: "bar", type: "userMessage" },
    ];
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(fakeMessages),
    });

    const { result } = renderHookWithProviders(() => useGetMessages());
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    vi.useRealTimers();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledWith(`${API_URL}${MESSAGES_ENDPOINT}`, {
      headers: {
        "Content-Type": "application/json",
        [HEADER_API_KEY]: API_KEY,
      },
    });

    // State should reflect the fetched messages
    expect(result.current.data).toEqual(fakeMessages);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);

    // Test that refetch works
    act(() => {
      result.current.refetch();
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("handles errors and sets error state", async () => {
    const error = new Error("Network failure");
    (fetch as Mock).mockRejectedValue(error);

    const { result } = renderHookWithProviders(() => useGetMessages());
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    vi.useRealTimers();

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetch).toHaveBeenCalledWith(`${API_URL}${MESSAGES_ENDPOINT}`, {
      headers: {
        "Content-Type": "application/json",
        [HEADER_API_KEY]: API_KEY,
      },
    });

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe("Network failure");
    expect(result.current.isLoading).toBe(false);
  });
});
