import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

test("renders without crashing", () => {
  const container = document.createElement("root");
  const root = createRoot(container!);
  root.render(<App />);
});
