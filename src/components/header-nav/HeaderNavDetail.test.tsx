import React from "react";
import { screen } from "@testing-library/react";

import HeaderNavDetail from "./HeaderNavDetail";
import renderWithProviders from "../../../test-utils/renderWithProviders";

const TITLE = "test title 123";
const SUB_TITLE = "test subtitle 456";
const DUMMY = () => {};

const Component = (
  <HeaderNavDetail
    titleText={TITLE}
    subtitleText={SUB_TITLE}
    onHomeClick={DUMMY}
    onThemeClick={DUMMY}
  />
);

test("renders title texts", async () => {
  renderWithProviders(Component);
  const title = screen.getByText(TITLE);
  expect(title).toBeInTheDocument();
  const subTitle = screen.getByText(SUB_TITLE);
  expect(subTitle).toBeInTheDocument();
});

test("renders title texts (mobile)", async () => {
  window.resizeTo(400, 999);
  renderWithProviders(Component);
  const title = screen.getByText(TITLE);
  expect(title).toBeInTheDocument();
  expect(title).toHaveClass("MuiTypography-h6");
  const subTitle = screen.getByText(SUB_TITLE);
  expect(subTitle).toBeInTheDocument();
  expect(subTitle).toHaveClass("MuiTypography-h6");
});
