import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";
import { act } from "@testing-library/react";

import { MESSAGES_ENDPOINT } from "../constants";
import type { Message } from "../../../types/Message";
import { useMutationMessages } from "./hook";
import { renderHookWithProviders } from "../../../tests/render";
import { API_KEY, API_URL, HEADER_API_KEY } from "../../../config/constants";

describe("useMutationMessages", () => {
  beforeEach(() => {
    // TODO: Improve integrating MSW
    vi.stubGlobal("fetch", vi.fn());
  });

  const input = { content: "hello" };
  const fakeMessage: Message = {
    id: 1,
    content: "hello",
    type: "userMessage",
  };

  it("successfully posts and updates state", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(fakeMessage),
    });

    const { result } = renderHookWithProviders(() => useMutationMessages());
    act(() => {
      vi.advanceTimersToNextTimer();
    });

    let returned: Message | null = null;
    await act(async () => {
      returned = await result.current.mutate(input);
    });

    // authFetch should have been called with the endpoint and correct options
    expect(fetch).toHaveBeenCalledWith(`${API_URL}${MESSAGES_ENDPOINT}`, {
      method: "POST",
      body: JSON.stringify(input),
      headers: {
        "Content-Type": "application/json",
        [HEADER_API_KEY]: API_KEY,
      },
    });

    // mutate should return the data
    expect(returned).toEqual(fakeMessage);

    // hook state should reflect the successful mutation
    expect(result.current.data).toEqual(fakeMessage);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("handles errors and updates error state", async () => {
    const error = new Error("Network failure");
    (fetch as Mock).mockRejectedValue(error);

    const { result } = renderHookWithProviders(() => useMutationMessages());
    act(() => {
      vi.advanceTimersToNextTimer();
    });

    let returned: Message | null = null;
    await act(async () => {
      returned = await result.current.mutate(input);
    });

    // on error, returns null
    expect(returned).toBeNull();

    // state should reflect error
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Network failure");
    expect(result.current.isLoading).toBe(false);
  });
});
