import React from "react";
import { screen } from "@testing-library/react";

import HeaderNavThumbs from "./HeaderNavThumbs";
import renderWithProviders from "../../test-utils/renderWithProviders";
import { initialState } from "../../app/state/home/state";

const BRAND = "test brand 123";
const DUMMY = () => {};

const Component = (
  <HeaderNavThumbs
    brandName={BRAND}
    checkboxData={initialState.nav.checkboxes}
    onBrandClick={DUMMY}
    onThemeClick={DUMMY}
    onCheckboxChange={DUMMY}
  />
);

test("renders brand", async () => {
  renderWithProviders(Component);
  const brand = screen.getByText(BRAND);
  expect(brand).toBeInTheDocument();
});
