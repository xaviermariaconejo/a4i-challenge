import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Footer } from "./index";

describe("Footer", () => {
  it("renders the copyright text with current year", () => {
    const currentYear = new Date().getFullYear().toString();
    render(<Footer />);
    const regex = new RegExp(
      `©\\s*${currentYear}\\s*A4I Challenge\\. All rights reserved\\.`
    );

    expect(screen.getByText(regex, { exact: false })).toBeInTheDocument();
  });
});
