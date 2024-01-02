import React from "react";

import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { App } from "./App";

test("loads data, renders home (inc. nav) and navigates to about", async () => {
  render(<App />);
  const spinner = screen.getByTestId("maindata-spinner");
  await waitForElementToBeRemoved(spinner);
  const homePage = await screen.findByTestId("home-page");
  expect(homePage).toBeInTheDocument();
  const aboutLink = screen.getByTestId("nav-thumbs-about-button");
  fireEvent.click(aboutLink);
  const aboutPage = await screen.findByTestId("about-page");
  expect(aboutPage).toBeInTheDocument();
});
