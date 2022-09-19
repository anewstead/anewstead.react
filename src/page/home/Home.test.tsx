import React from "react";
import { screen } from "@testing-library/react";

import Home from "./Home";
import mainDataMock from "../../app/api/mock/mainDataMock.json";
import renderWithReduxAndRouter from "../../test-utils/renderWithReduxAndRouter";
import { initialState as homeInitialState } from "../../app/state/home/state";

const MAIN_DATA = JSON.parse(JSON.stringify(mainDataMock));

test("renders unset (data 'undefined')", async () => {
  renderWithReduxAndRouter(<Home />);
  const unset = screen.queryByTestId("home-unset");
  expect(unset).toBeInTheDocument();
});

test("renders nothumbs (data has no items)", async () => {
  const homeState = { ...homeInitialState, displayThumbs: [] };
  renderWithReduxAndRouter(<Home />, {
    preloadedState: { home: homeState },
  });
  const nothumbs = screen.queryByTestId("home-nothumbs");
  expect(nothumbs).toBeInTheDocument();
});

test("renders thumbs (data has items)", async () => {
  renderWithReduxAndRouter(<Home />, {
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
