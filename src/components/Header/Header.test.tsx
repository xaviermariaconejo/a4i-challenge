import { screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import { renderWithProviders } from "../../tests/render";
import { APP_NAME } from "../../config/constants";

import { Header } from "./index";

describe("Header component", () => {
  it("renders the default title", () => {
    renderWithProviders(<Header />);
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(screen.getByRole("heading", { name: APP_NAME })).toBeInTheDocument();
  });

  it("opens and closes the Settings modal", () => {
    renderWithProviders(<Header />);
    act(() => {
      vi.advanceTimersToNextTimer();
    });
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();

    const openButton = screen.getByRole("button", { name: /open settings/i });
    fireEvent.click(openButton);

    expect(
      screen.getByRole("heading", { name: "Settings" })
    ).toBeInTheDocument();

    const closeButton = screen.getByLabelText("Close settings");
    fireEvent.click(closeButton);

    expect(
      screen.queryByRole("heading", { name: "Settings" })
    ).not.toBeInTheDocument();
  });
});
