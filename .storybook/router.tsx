// https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function

import React from "react";
import { MemoryRouter } from "react-router-dom";
import type { PropsWithChildren } from "react";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends PropsWithChildren {
  route?: string;
}

export const Router = ({ children, route = "/" }: ExtendedRenderOptions) => {
  window.history.pushState({}, "Test page", route);
  return <MemoryRouter>{children}</MemoryRouter>;
};
