import React from "react";
import { screen } from "@testing-library/react";

import About from "./About";
import renderWithProviders from "../../../test-utils/renderWithProviders";

test("renders about page with detail nav", async () => {
  renderWithProviders(<About />);
  const aboutPage = screen.getByTestId("about-page");
  expect(aboutPage).toBeInTheDocument();
  const navDetail = screen.getByTestId("nav-detail");
  expect(navDetail).toBeInTheDocument();
});
