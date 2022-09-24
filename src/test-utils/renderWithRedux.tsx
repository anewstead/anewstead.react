// https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function

import React from "react";
import type { PreloadedState } from "@reduxjs/toolkit";
import type { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";

import type { AppStore, RootState } from "../app/state/store";
import { setupStore } from "../app/state/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const renderWithRedux = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(undefined, preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>) => {
    return <ReduxProvider store={store}>{children}</ReduxProvider>;
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithRedux;
