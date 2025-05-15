import { type PropsWithChildren, type ReactElement } from "react";
import {
  render,
  renderHook,
  type RenderHookOptions,
  type RenderHookResult,
  type RenderOptions,
} from "@testing-library/react";

import { Providers } from "../Providers";

type Ui = ReactElement;
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {}

export function renderWithProviders(ui: Ui, options?: ExtendedRenderOptions) {
  return render(<Providers>{ui}</Providers>, options);
}

export function renderHookWithProviders<P, R>(
  hook: (props: P) => R,
  options?: Omit<RenderHookOptions<P>, "wrapper">
): RenderHookResult<R, P> {
  const wrapper = ({ children }: PropsWithChildren<{}>) => (
    <Providers>{children}</Providers>
  );

  return renderHook<R, P>(hook, { wrapper, ...options });
}

export * from "@testing-library/react";
