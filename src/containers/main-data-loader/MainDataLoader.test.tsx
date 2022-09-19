import React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";

import MainDataLoader from "./MainDataLoader";
import renderWithRedux from "../../test-utils/renderWithRedux";
import { server } from "../../app/api/mock/server";

const component = (
  <MainDataLoader>
    <div data-testid="child-content" />
  </MainDataLoader>
);

// Note: React/Jest throws an error if we do not test against visual state change
// https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
test("renders spinner, removes it and renders child-content", async () => {
  renderWithRedux(component);
  const spinner = screen.queryByTestId("maindata-spinner");
  expect(spinner).toBeInTheDocument();
  await waitForElementToBeRemoved(spinner);
  const content = screen.queryByTestId("child-content");
  expect(content).toBeInTheDocument();
});

test("renders load failed", async () => {
  server.setStatus(400);
  renderWithRedux(component);
  const spinner = screen.queryByTestId("maindata-spinner");
  await waitForElementToBeRemoved(spinner);
  const content = screen.queryByTestId("maindata-failed");
  expect(content).toBeInTheDocument();
});

test("renders loaded empty data", async () => {
  server.setStatus(204);
  renderWithRedux(component);
  const spinner = screen.queryByTestId("maindata-spinner");
  await waitForElementToBeRemoved(spinner);
  const content = screen.queryByTestId("maindata-empty");
  expect(content).toBeInTheDocument();
});
