import React from "react";
import { screen } from "@testing-library/react";

import ThemeWrapper from "./ThemeWrapper";
import renderWithProviders from "../../test-utils/renderWithProviders";

const component = (
  <ThemeWrapper>
    <div data-testid="child-content" />
  </ThemeWrapper>
);

test("renders child-content", async () => {
  renderWithProviders(component);
  const child = screen.getByTestId("child-content");
  expect(child).toBeInTheDocument();
});
