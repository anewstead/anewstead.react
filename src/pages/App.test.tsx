import React from "react";
import userEvent from "@testing-library/user-event";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import App from "./App";

test("render and navigates to about", async () => {
  const user = userEvent.setup();
  render(<App />);
  const spinner = screen.getByTestId("maindata-spinner");
  expect(spinner).toBeInTheDocument();
  await waitForElementToBeRemoved(spinner);
  const aboutLink = screen.getByTestId("nav-thumbs-about-button");
  await user.click(aboutLink);
  const aboutPage = await screen.findByTestId("about-page");
  expect(aboutPage).toBeInTheDocument();
});
