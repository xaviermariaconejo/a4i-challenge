import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Header } from "./index";
import { renderWithProviders } from "../../tests/render";

describe("Header component", () => {
  it("renders the default title", () => {
    renderWithProviders(<Header />);
    expect(
      screen.getByRole("heading", { name: /A4I Challenge/i })
    ).toBeInTheDocument();
  });

  it("renders a custom title when provided", () => {
    const customTitle = "My App";
    renderWithProviders(<Header title={customTitle} />);
    expect(
      screen.getByRole("heading", { name: customTitle })
    ).toBeInTheDocument();
  });

  it("opens and closes the Settings modal", () => {
    renderWithProviders(<Header />);
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();

    const openButton = screen.getByRole("button", { name: /open settings/i });
    fireEvent.click(openButton);

    expect(
      screen.getByRole("heading", { name: "Settings" })
    ).toBeInTheDocument();

    const closeButton = screen.getByLabelText("Close settings");
    fireEvent.click(closeButton);

    expect(
      screen.queryByRole("header", { name: "Settings" })
    ).not.toBeInTheDocument();
  });
});
