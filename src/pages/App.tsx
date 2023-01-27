import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";

import AppRoutes from "./AppRoutes";
import MainDataLoader from "../wrappers/main-data-loader";
import ThemeWrapper from "../wrappers/theme-wrapper";
import store from "../core/state/store";

/**
 * React.StrictMode intentionally double-invokes some functions in dev mode to help detect issues
 * notably the render function is called twice, see:
 * https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
 */
const App = () => {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <ThemeWrapper>
          <MainDataLoader>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </MainDataLoader>
        </ThemeWrapper>
      </ReduxProvider>
    </React.StrictMode>
  );
};

export default App;
