import React from "react";

import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { store } from "../state/store";
import { MainDataLoader } from "../wrappers/main-data-loader";
import { ThemeWrapper } from "../wrappers/theme-wrapper";

import { router } from "./AppRoutes";
/**
 * React.StrictMode intentionally double-invokes some functions in dev mode to
 * help detect issues notably the render function is called twice, see:
 * https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
 */
export const App = () => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <ThemeWrapper>
          <MainDataLoader>
            <RouterProvider router={router} />
          </MainDataLoader>
        </ThemeWrapper>
      </ReduxProvider>
    </React.StrictMode>
  );
};
