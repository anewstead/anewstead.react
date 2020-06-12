import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/app/app";
import store from "./containers/app/store";
import * as serviceWorker from "./serviceWorker";

// note. cannot use React.StrictMode as material UI is yet to fully update
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (window.location.hostname === "localhost") {
  serviceWorker.unregister();
} else {
  serviceWorker.register();
}
