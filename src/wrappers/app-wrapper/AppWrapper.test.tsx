import React from "react";
import { screen } from "@testing-library/react";

import AppWrapper from "./AppWrapper";
import renderWithProviders from "../../test-utils/renderWithProviders";

const component = (
  <AppWrapper headerNavType="detail">
    <div data-testid="child-content" />
  </AppWrapper>
);

test("renders child-content", async () => {
  renderWithProviders(component);
  const appWrapper = screen.getByTestId("app-layout");
  expect(appWrapper).toBeInTheDocument();
  const content = screen.getByTestId("child-content");
  expect(content).toBeInTheDocument();
});
