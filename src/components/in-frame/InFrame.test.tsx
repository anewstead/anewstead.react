import React from "react";
import { screen, waitFor } from "@testing-library/react";

import InFrame from "./InFrame";
import renderWithProviders from "../../test-utils/renderWithProviders";
import type { IMainData } from "../../core/state/main-data/state";
import { useDetectAdBlock } from "../../hooks/useDetectAdBlock";

jest.mock("../../hooks/useDetectAdBlock");

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
  (useDetectAdBlock as jest.Mock).mockReturnValue({
    adblockChecked: false,
    adBlockDetected: false,
  });
  renderWithProviders(CompAsSite, { preloadedState });
  const iframe = screen.getByTestId("inframe-iframe");
  expect(iframe).toBeInTheDocument();
});

test("renders as banner (pre adblock test)", async () => {
  (useDetectAdBlock as jest.Mock).mockReturnValue({
    adblockChecked: false,
    adBlockDetected: false,
  });
  renderWithProviders(CompAsBanner, { preloadedState });
  const unset = screen.getByTestId("inframe-unset");
  expect(unset).toBeInTheDocument();
});

test("renders as banner (has adblock)", async () => {
  (useDetectAdBlock as jest.Mock).mockReturnValue({
    adblockChecked: true,
    adBlockDetected: true,
  });
  renderWithProviders(CompAsBanner, { preloadedState });
  const failover = screen.getByTestId("inframe-failover");
  expect(failover).toBeInTheDocument();
});

test("renders as banner (no adblock)", async () => {
  (useDetectAdBlock as jest.Mock).mockReturnValue({
    adblockChecked: true,
    adBlockDetected: false,
  });
  renderWithProviders(CompAsBanner, { preloadedState });
  await waitFor(() => {
    return expect(
      screen.queryByTestId("inframe-unset")
    ).not.toBeInTheDocument();
  });
  const iframe = screen.getByTestId("inframe-iframe");
  expect(iframe).toBeInTheDocument();
});
