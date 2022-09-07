import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { createRoot } from "react-dom/client";

import * as serviceWorker from "./serviceWorker";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import store from "./app/state/redux";

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
