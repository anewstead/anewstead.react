import React from "react";

import { within, expect } from "@storybook/test";
import { Provider } from "react-redux";
import { withRouter } from "storybook-addon-remix-react-router";

import { setupStore } from "@/state/store";
import {
  projectGalleryWebsite,
  projectIframeAdvert,
  projectVideoApp,
} from "@testing/msw/mockJson";

import { Project } from "./Project";

import type { FprojectFragment } from "@/services/hygraph/generated/graphql";
import type { IFetchMainDataState } from "@/state/mainData/state";
import type { AppState } from "@/state/store";
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
  error: null,
  loading: false,
  loaded: true,
};

// -----------------------------------------------------------------------------

const BadViewTypeState = {
  mainData: {
    ...loadedData,
    data: {
      projects: [
        {
          uid: "unknown_value",
          view: { type: "unknown_view_type" },
        } as unknown as FprojectFragment,
      ],
    },
  },
} as AppState;

export const Default: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:uid",
      routeParams: {
        uid: BadViewTypeState.mainData.data!.projects[0].uid,
      },
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
      await expect(page).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      await expect(navDetail).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------

const galleryState = {
  mainData: {
    ...loadedData,
    data: {
      projects: [projectGalleryWebsite],
    },
  },
} as AppState;

export const GalleryPage: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:uid",
      routeParams: {
        uid: galleryState.mainData.data!.projects[0].uid,
      },
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
      const carousel = canvas.getByTestId("carousel");
      await expect(carousel).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      await expect(navDetail).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------

const videoState = {
  mainData: {
    ...loadedData,
    data: { projects: [projectVideoApp] },
  },
} as AppState;

export const VideoPage: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:uid",
      routeParams: {
        uid: videoState.mainData.data!.projects[0].uid,
      },
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
      await expect(vid).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      await expect(navDetail).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------

const inFrameState = {
  mainData: {
    ...loadedData,
    data: { projects: [projectIframeAdvert] },
  },
} as AppState;

export const InFramePage: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:uid",
      routeParams: {
        uid: inFrameState.mainData.data!.projects[0].uid,
      },
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
      await expect(iframe).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------

export const UnknownProject: Story = {
  parameters: {
    reactRouter: {
      routePath: "/project/:uid",
      routeParams: { uid: "unknown_uid" },
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
      await expect(page).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      await expect(navDetail).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------
