import React from "react";
import { screen } from "@testing-library/react";

import PageLayout from "./PageLayout";
import renderWithProviders from "../../test-utils/renderWithProviders";

const component = (
  <PageLayout headerNavType="detail">
    <div data-testid="child-content" />
  </PageLayout>
);

test("renders child-content", async () => {
  renderWithProviders(component);
  const pageLayout = screen.getByTestId("app-layout");
  expect(pageLayout).toBeInTheDocument();
  const content = screen.getByTestId("child-content");
  expect(content).toBeInTheDocument();
});
