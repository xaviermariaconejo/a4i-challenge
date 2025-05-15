import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";

import { Providers } from "../Providers";

type Ui = ReactElement;
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {}

export function renderWithProviders(ui: Ui, options?: ExtendedRenderOptions) {
  return render(<Providers>{ui}</Providers>, options);
}

export * from "@testing-library/react";
