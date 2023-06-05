/* istanbul ignore file */

import "./style/global/index.scss";

import React from "react";
import { createRoot } from "react-dom/client";

import * as serviceWorker from "./serviceWorker";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";

// Embed App into the HTML. Only!
// all App code is then contained in the src folder
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
