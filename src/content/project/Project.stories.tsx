import React from "react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { Provider } from "react-redux";
import { withRouter } from "storybook-addon-react-router-v6";

import {
  galleryProjectData,
  iframeProjectData,
  unknownProjectTypeData,
  videoProjectData,
} from "../../../test-utils/msw/mockJson";
import { setupStore } from "../../state/store";

import Project from "./Project";

import type { IFetchMainDataState } from "../../state/main-data/state";
import type { AppState } from "../../state/store";
import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof Project> = {
  component: Project,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const loadedData: IFetchMainDataState = {
  data: null,
  errors: undefined,
  loading: false,
  loaded: true,
  rejected: false,
};

// -----------------------------------------------------------------------------

const BadViewTypeState: Pick<AppState, "mainData"> = {
  mainData: {
    ...loadedData,
    data: {
      projects: [unknownProjectTypeData],
    },
  },
};

export const Default: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:id",
      routeParams: { uid: BadViewTypeState.mainData.data?.projects[0].uid },
    },
  },
  decorators: [
    withRouter,
    (Story) => {
      return (
        <Provider store={setupStore(undefined, BadViewTypeState)}>
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

const galleryState: Pick<AppState, "mainData"> = {
  mainData: {
    ...loadedData,
    data: {
      projects: [galleryProjectData],
    },
  },
};

export const GalleryPage: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:id",
      routeParams: { uid: galleryState.mainData.data?.projects[0].uid },
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

const videoState: Pick<AppState, "mainData"> = {
  mainData: {
    ...loadedData,
    data: { projects: [videoProjectData] },
  },
};

export const VideoPage: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:id",
      routeParams: { uid: videoState.mainData.data?.projects[0].uid },
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

const inFrameState: Pick<AppState, "mainData"> = {
  mainData: {
    ...loadedData,
    data: { projects: [iframeProjectData] },
  },
};

export const InFramePage: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:id",
      routeParams: { uid: inFrameState.mainData.data?.projects[0].uid },
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

// -----------------------------------------------------------------------------

export const UnknownProject: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:id",
      routeParams: { id: "unknown_id" },
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
    await step("renders no-match with nav-detail", async () => {
      const page = canvas.getByTestId("nomatch-page");
      expect(page).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      expect(navDetail).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------
