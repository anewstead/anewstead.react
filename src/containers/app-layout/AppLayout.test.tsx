import React from "react";
import { screen } from "@testing-library/react";

import AppLayout from "./AppLayout";
import renderWithReduxAndRouter from "../../test-utils/renderWithReduxAndRouter";

const component = (
  <AppLayout headerNavType="detail">
    <div data-testid="child-content" />
  </AppLayout>
);

test("renders child-content", async () => {
  renderWithReduxAndRouter(component);
  const appLayout = screen.queryByTestId("app-layout");
  expect(appLayout).toBeInTheDocument();
  const content = screen.queryByTestId("child-content");
  expect(content).toBeInTheDocument();
});
