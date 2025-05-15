import { act, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { APP_NAME } from "../../config/constants";

import { Footer } from "./index";
import { renderWithProviders } from "../../tests/render";

describe("Footer", () => {
  it("renders the copyright text with current year", () => {
    const currentYear = new Date().getFullYear().toString();
    renderWithProviders(<Footer />);
    act(() => {
      vi.advanceTimersToNextTimer();
    });

    const regex = new RegExp(
      `©\\s*${currentYear}\\s*${APP_NAME}\\. All rights reserved\\.`
    );

    expect(screen.getByText(regex, { exact: false })).toBeInTheDocument();
  });
});
