import React from "react";
import { screen } from "@testing-library/react";

import ThemeWrapper from "./ThemeWrapper";
import renderWithRedux from "../../test-utils/renderWithRedux";

const component = (
  <ThemeWrapper>
    <div data-testid="child-content" />
  </ThemeWrapper>
);

test("renders child-content", async () => {
  renderWithRedux(component);
  const child = screen.getByTestId("child-content");
  expect(child).toBeInTheDocument();
});
