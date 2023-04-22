// https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function

import React from "react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import type { PreloadedState } from "@reduxjs/toolkit";
import type { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";

import ThemeWrapper from "../src/wrappers/theme-wrapper";
import type { AppState, AppStore } from "../src/state/store";
import { setupStore } from "../src/state/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<AppState>;
  store?: AppStore;
  route?: string;
}

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(undefined, preloadedState),
    route = "/",
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  window.history.pushState({}, "Test page", route);
  const Wrapper = ({ children }: PropsWithChildren<{}>) => {
    return (
      <ReduxProvider store={store}>
        <ThemeWrapper>
          <BrowserRouter>{children}</BrowserRouter>
        </ThemeWrapper>
      </ReduxProvider>
    );
  };
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    user: userEvent.setup(),
  };
};

export default renderWithProviders;
