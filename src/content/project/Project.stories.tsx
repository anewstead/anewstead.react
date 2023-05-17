import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { expect } from "@storybook/jest";
import { withRouter } from "storybook-addon-react-router-v6";
import { within } from "@storybook/testing-library";

import Project from "./Project";
import type { IMainData } from "../../state/main-data/state";
import { mainDataMock } from "../../../test-utils/msw/mockJson";
import { setupStore } from "../../state/store";

// -----------------------------------------------------------------------------
const meta: Meta<typeof Project> = {
  component: Project,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const MAIN_DATA: IMainData[] = JSON.parse(JSON.stringify(mainDataMock));

const dataVideo = MAIN_DATA[1];

const dataGallery = MAIN_DATA[0];

const dataIframe = MAIN_DATA[4];

const dataNoMatch = {
  ...MAIN_DATA[0],
  view: {
    type: "testNoMatch",
  },
} as IMainData;

const loadedData = {
  loading: false,
  loaded: true,
  error: false,
};

// -----------------------------------------------------------------------------

const noMatchState = {
  mainData: {
    ...loadedData,
    data: [dataNoMatch],
  },
};

export const Default: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:id",
      routeParams: { id: noMatchState.mainData.data[0].id },
    },
  },
  decorators: [
    withRouter,
    (Story) => {
      return (
        <Provider store={setupStore(undefined, noMatchState)}>
          {Story()}
        </Provider>
      );
    },
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders no-match with nav-detail", async () => {
      const page = canvas.getByTestId("nomatch-page");
      expect(page).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      expect(navDetail).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------

const videoState = {
  mainData: {
    ...loadedData,
    data: [dataVideo],
  },
};

export const VideoPage: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:id",
      routeParams: { id: videoState.mainData.data[0].id },
    },
  },
  decorators: [
    withRouter,
    (Story) => {
      return (
        <Provider store={setupStore(undefined, videoState)}>{Story()}</Provider>
      );
    },
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders a video with nav-detail", async () => {
      const vid = canvasElement.querySelector("video");
      expect(vid).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      expect(navDetail).toBeInTheDocument();
    });
  },
};
// -----------------------------------------------------------------------------

const galleryState = {
  mainData: {
    ...loadedData,
    data: [dataGallery],
  },
};

export const GalleryPage: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:id",
      routeParams: { id: galleryState.mainData.data[0].id },
    },
  },
  decorators: [
    withRouter,
    (Story) => {
      return (
        <Provider store={setupStore(undefined, galleryState)}>
          {Story()}
        </Provider>
      );
    },
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders carousel with nav-detail", async () => {
      const carousel = await canvas.getByTestId("carousel");
      expect(carousel).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      expect(navDetail).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------

const inFrameState = {
  mainData: {
    ...loadedData,
    data: [dataIframe],
  },
};

export const InFramePage: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:id",
      routeParams: { id: inFrameState.mainData.data[0].id },
    },
  },
  decorators: [
    withRouter,
    (Story) => {
      return (
        <Provider store={setupStore(undefined, inFrameState)}>
          {Story()}
        </Provider>
      );
    },
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("it ignores adblock and renders an iframe", async () => {
      const iframe = await canvas.findByTestId("inframe-iframe");
      expect(iframe).toBeInTheDocument();
    });
  },
};
