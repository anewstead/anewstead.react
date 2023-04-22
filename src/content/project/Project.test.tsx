import React from "react";
import { Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";

import Project from "./Project";
import renderWithProviders from "../../../test-utils/renderWithProviders";
import type { IMainData } from "../../state/main-data/state";
import { unSetDivTest } from "../../components/in-frame/InFrame.test";

const baseData = {
  id: 21,
  client: "client text",
  brand: "brand text",
  project: "project text",
};

const dataVideo = {
  ...baseData,
  type: "app",
  view: {
    type: "video",
    href: "href",
    poster: "poster",
  },
} as IMainData;

const dataGallery = {
  ...baseData,
  type: "site",
  view: {
    type: "gallery",
    width: 780,
    height: 480,
    stills: ["img.jpg", "img2.jpg"],
  },
} as IMainData;

const dataIframe = {
  ...baseData,
  type: "site",
  view: {
    type: "iframe",
    width: 300,
    height: 250,
    href: "href",
    still: "still.jpg",
  },
} as IMainData;

const dataNoMatch = {
  ...baseData,
  type: "app",
  view: {
    type: "testNoMatch",
  },
} as IMainData;

const loadedData = {
  loading: false,
  loaded: true,
  error: false,
};

const CompWithRoute = (
  <Routes>
    <Route path="/project/:id" element={<Project />} />
  </Routes>
);

test("renders nomatch when not given correct url param", async () => {
  renderWithProviders(<Project />);
  const noMatch = screen.getByTestId("nomatch-page");
  expect(noMatch).toBeInTheDocument();
});

test("renders VIDEO with brand and project text", async () => {
  const uState = {
    mainData: {
      ...loadedData,
      data: [dataVideo],
    },
  };
  renderWithProviders(CompWithRoute, {
    preloadedState: uState,
    route: `/project/${uState.mainData.data[0].id}`,
  });
  const projectPage = screen.getByTestId("project-page");
  expect(projectPage).toBeInTheDocument();
  const subtitle = screen.getByTestId("nav-detail-subtitle");
  expect(subtitle).toBeInTheDocument();
  expect(subtitle.textContent).toEqual(
    `${uState.mainData.data[0].brand} - ${uState.mainData.data[0].project}`
  );
});

test("renders with only brand text", async () => {
  const uState = {
    mainData: {
      ...loadedData,
      data: [{ ...dataVideo, project: "" }],
    },
  };
  renderWithProviders(CompWithRoute, {
    preloadedState: uState,
    route: `/project/${uState.mainData.data[0].id}`,
  });
  const subtitle = screen.getByTestId("nav-detail-subtitle");
  expect(subtitle.textContent).toEqual(`${uState.mainData.data[0].brand}`);
});

test("renders with only project text", async () => {
  const uState = {
    mainData: {
      ...loadedData,
      data: [{ ...dataVideo, brand: "" }],
    },
  };
  renderWithProviders(CompWithRoute, {
    preloadedState: uState,
    route: `/project/${uState.mainData.data[0].id}`,
  });
  const subtitle = screen.getByTestId("nav-detail-subtitle");
  expect(subtitle.textContent).toEqual(`${uState.mainData.data[0].project}`);
});

test("renders GALLERY", async () => {
  const uState = {
    mainData: {
      ...loadedData,
      data: [dataGallery],
    },
  };
  renderWithProviders(CompWithRoute, {
    preloadedState: uState,
    route: `/project/${uState.mainData.data[0].id}`,
  });
});

test("renders IFRAME (without adblock test)", async () => {
  const uState = {
    mainData: {
      ...loadedData,
      data: [dataIframe],
    },
  };
  renderWithProviders(CompWithRoute, {
    preloadedState: uState,
    route: `/project/${uState.mainData.data[0].id}`,
  });
  await unSetDivTest();
});

test("renders nomatch with noMatch view type", async () => {
  const uState = {
    mainData: {
      ...loadedData,
      data: [dataNoMatch],
    },
  };
  renderWithProviders(CompWithRoute, {
    preloadedState: uState,
    route: `/project/${uState.mainData.data[0].id}`,
  });
  const noMatch = screen.getByTestId("nomatch-page");
  expect(noMatch).toBeInTheDocument();
});
