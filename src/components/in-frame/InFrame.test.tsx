import React from "react";
import { screen, waitForElementToBeRemoved } from "@testing-library/react";

import InFrame from "./InFrame";
import renderWithProviders from "../../../test-utils/renderWithProviders";
import type { IMainData } from "../../state/main-data/state";
import { mswDetectAdBlockBlocked } from "../../services/__mocks__/detectAdBlockHandlers";
import { server } from "../../services/__mocks__/server";

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

export const unSetDivTest = async () => {
  const unSet = screen.getByTestId("inframe-unset");
  expect(unSet).toBeInTheDocument();
  // note. must be waitForElementToBeRemoved(callback())
  await waitForElementToBeRemoved(() => {
    return screen.getByTestId("inframe-unset");
  });
};

test("renders as website", async () => {
  renderWithProviders(CompAsSite, { preloadedState });
  await unSetDivTest();
  const iframe = screen.getByTestId("inframe-iframe");
  expect(iframe).toBeInTheDocument();
});

test("renders as banner (has adblock)", async () => {
  server.use(mswDetectAdBlockBlocked);
  renderWithProviders(CompAsBanner, { preloadedState });
  await unSetDivTest();
  const failover = await screen.getByTestId("inframe-failover");
  expect(failover).toBeInTheDocument();
});

test("renders as banner (no adblock)", async () => {
  renderWithProviders(CompAsBanner, { preloadedState });
  await unSetDivTest();
  const iframe = screen.getByTestId("inframe-iframe");
  expect(iframe).toBeInTheDocument();
});
