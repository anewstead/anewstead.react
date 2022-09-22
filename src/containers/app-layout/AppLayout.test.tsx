import React from "react";
import { screen } from "@testing-library/react";

import AppLayout from "./AppLayout";
import renderWithProviders from "../../test-utils/renderWithProviders";

const component = (
  <AppLayout headerNavType="detail">
    <div data-testid="child-content" />
  </AppLayout>
);

test("renders child-content", async () => {
  renderWithProviders(component);
  const appLayout = screen.getByTestId("app-layout");
  expect(appLayout).toBeInTheDocument();
  const content = screen.getByTestId("child-content");
  expect(content).toBeInTheDocument();
});
