import React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";

import MainDataLoader from "./MainDataLoader";
import renderWithProviders from "../../test-utils/renderWithProviders";
import {
  mswLoadMainDataNoContent,
  mswLoadMainDataReject,
} from "../../core/services/__mocks__/loadMainDataHandlers";
import { server } from "../../core/services/__mocks__/server";

const component = (
  <MainDataLoader>
    <div data-testid="child-content" />
  </MainDataLoader>
);

// Note: React/Jest throws an error if we do not test against visual state change
// https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
test("renders spinner, removes it and renders child-content", async () => {
  renderWithProviders(component);
  const spinner = screen.getByTestId("maindata-spinner");
  expect(spinner).toBeInTheDocument();
  await waitForElementToBeRemoved(spinner);
  const content = screen.getByTestId("child-content");
  expect(content).toBeInTheDocument();
});

test("renders load failed", async () => {
  server.use(mswLoadMainDataReject);
  renderWithProviders(component);
  const spinner = screen.getByTestId("maindata-spinner");
  await waitForElementToBeRemoved(spinner);
  const content = screen.getByTestId("maindata-failed");
  expect(content).toBeInTheDocument();
});

test("renders loaded empty data", async () => {
  server.use(mswLoadMainDataNoContent);
  renderWithProviders(component);
  const spinner = screen.getByTestId("maindata-spinner");
  await waitForElementToBeRemoved(spinner);
  const content = screen.getByTestId("maindata-empty");
  expect(content).toBeInTheDocument();
});
