// https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function

import React from "react";
import type { PreloadedState } from "@reduxjs/toolkit";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import type { AppState, AppStore } from "../src/core/state/store";
import { setupStore } from "../src/core/state/store";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends PropsWithChildren {
  preloadedState?: PreloadedState<AppState>;
  store?: AppStore;
}

export const ReduxProvider = ({
  children,
  preloadedState = {},
  // Automatically create a store instance if no store was passed in
  store = setupStore(undefined, preloadedState),
}: ExtendedRenderOptions) => {
  return <Provider store={store}>{children}</Provider>;
};
