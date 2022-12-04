import React from "react";
import { screen } from "@testing-library/react";

import Home from "./Home";
import mainDataMock from "../../core/services/mock/mainDataMock.json";
import renderWithProviders from "../../test-utils/renderWithProviders";
import type { IMainData } from "../../core/state/main-data/state";
import { initialState as homeInitialState } from "../../core/state/home/state";

const MAIN_DATA: IMainData[] = JSON.parse(JSON.stringify(mainDataMock));

test("renders unset (data 'undefined')", async () => {
  renderWithProviders(<Home />);
  const unset = screen.getByTestId("home-unset");
  expect(unset).toBeInTheDocument();
});

test("renders nothumbs (data has no items)", async () => {
  const homeState = { ...homeInitialState, displayThumbs: [] };
  renderWithProviders(<Home />, {
    preloadedState: { home: homeState },
  });
  const nothumbs = screen.getByTestId("home-nothumbs");
  expect(nothumbs).toBeInTheDocument();
});

test("renders thumbs (data has items)", async () => {
  renderWithProviders(<Home />, {
    preloadedState: {
      mainData: {
        loading: false,
        loaded: true,
        error: false,
        data: MAIN_DATA,
      },
    },
  });
  const links = screen.getAllByRole("link");
  const thumbs = links.filter((item) => {
    return item.getAttribute("href")?.includes("/project/");
  });
  expect(thumbs.length).toBeGreaterThan(0);
});
