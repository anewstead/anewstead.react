import React from "react";
import { screen } from "@testing-library/react";

import NoMatch from "./NoMatch";
import renderWithProviders from "../../test-utils/renderWithProviders";

test("renders NoMatch page with detail nav", async () => {
  renderWithProviders(<NoMatch />);
  const noMatchPage = screen.getByTestId("nomatch-page");
  expect(noMatchPage).toBeInTheDocument();
  const navDetail = screen.getByTestId("nav-detail");
  expect(navDetail).toBeInTheDocument();
});
