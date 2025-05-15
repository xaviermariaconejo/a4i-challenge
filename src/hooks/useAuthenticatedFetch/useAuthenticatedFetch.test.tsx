import { describe, it, expect, vi, beforeEach, type Mock } from "vitest";

import { useAuthenticatedFetch, type Fetcher } from "./index";
import { API_KEY, API_URL, HEADER_API_KEY } from "../../config/constants";
import { act } from "@testing-library/react";
import { renderHookWithProviders } from "../../tests/render";

describe("useAuthenticatedFetch", () => {
  beforeEach(() => {
    // TODO: Improve integrating MSW
    vi.stubGlobal("fetch", vi.fn());
  });

  it("calls fetch with correct URL and headers and returns JSON on success", async () => {
    const fakeData = { message: "ok" };
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(fakeData),
    });

    const { result } = renderHookWithProviders<[], Fetcher>(() =>
      useAuthenticatedFetch()
    );
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    const authFetch = result.current;

    const data = await authFetch("/endpoint", {
      method: "POST",
      headers: { "X-Custom": "foo" },
    });

    // Ensure fetch was called with the correct URL and merged headers
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/endpoint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [HEADER_API_KEY]: API_KEY,
        "X-Custom": "foo",
      },
    });

    // And that it returned the parsed JSON
    expect(data).toEqual(fakeData);
  });

  it("throws an error with status and body text on non-ok response", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 401,
      text: vi.fn().mockResolvedValue("Unauthorized"),
    });

    const { result } = renderHookWithProviders<[], Fetcher>(() =>
      useAuthenticatedFetch()
    );
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    const authFetch = result.current;

    await expect(authFetch("/bad")).rejects.toThrow("Error 401: Unauthorized");
  });
});
