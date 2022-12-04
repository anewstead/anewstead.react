import React from "react";
import { detectAnyAdblocker } from "just-detect-adblock";
import { screen, waitFor } from "@testing-library/react";

import InFrame from "./InFrame";
import renderWithProviders from "../../test-utils/renderWithProviders";
import type { IMainData } from "../../core/state/main-data/state";

jest.mock("just-detect-adblock");

const dataIframe = {
  id: 21,
  client: "client text",
  brand: "brand text",
  project: "project text",
  type: "site",
  view: {
    type: "iframe",
    width: 300,
    height: 250,
    href: "href",
    still: "still.jpg",
  },
} as IMainData;

const preloadedState = {
  mainData: {
    loading: false,
    loaded: true,
    error: false,
    data: [dataIframe],
  },
};

const CompAsSite = (
  <InFrame
    title="title"
    width={320}
    height={250}
    iframeURL="frameURL"
    failOverImageURL="imgURL"
    checkAdBlock={false}
  />
);

const CompAsBanner = (
  <InFrame
    title="title"
    width={320}
    height={250}
    iframeURL="frameURL"
    failOverImageURL="imgURL"
    checkAdBlock
  />
);

test("renders as website", async () => {
  renderWithProviders(CompAsSite, { preloadedState });
  const iframe = screen.getByTestId("inframe-iframe");
  expect(iframe).toBeInTheDocument();
});

test("renders as banner (has adblock)", async () => {
  detectAnyAdblocker.mockResolvedValue(true);
  renderWithProviders(CompAsBanner, { preloadedState });
  const unset = screen.getByTestId("inframe-unset");
  expect(unset).toBeInTheDocument();

  // waitForElementToBeRemoved > Error: Timed out in waitForElementToBeRemoved.
  // seems maybe have error related to speed of execution: @testing-library/react@13.4.0
  // see. https://github.com/testing-library/react-testing-library/issues/865#issuecomment-999033243

  // waitForElementToBeRemoved > test:
  // await waitForElementToBeRemoved(unset)
  //   .then(() => {
  //     console.log("item removed");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  // waitForElementToBeRemoved > solution:
  await waitFor(() => {
    return expect(
      screen.queryByTestId("inframe-unset")
    ).not.toBeInTheDocument();
  });

  const failover = screen.getByTestId("inframe-failover");
  expect(failover).toBeInTheDocument();
});

test("renders as banner (no adblock)", async () => {
  detectAnyAdblocker.mockResolvedValue(false);
  renderWithProviders(CompAsBanner, {
    preloadedState,
  });
  await waitFor(() => {
    return expect(
      screen.queryByTestId("inframe-unset")
    ).not.toBeInTheDocument();
  });
  const iframe = screen.getByTestId("inframe-iframe");
  expect(iframe).toBeInTheDocument();
});
