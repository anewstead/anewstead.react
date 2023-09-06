import React from "react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { sampleFetchData } from "../../../test-utils/msw/mockJson";
import { initialState as homeInitialState } from "../../state/home/state";
import { setupStore } from "../../state/store";

import Home from "./Home";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof Home> = {
  component: Home,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const defaultState = {
  mainData: {
    data: sampleFetchData.data,
    errors: undefined,
    loading: false,
    loaded: true,
    rejected: false,
  },
  home: {
    ...homeInitialState,
  },
};

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <Provider store={setupStore(undefined, defaultState)}>
          <BrowserRouter>{Story()}</BrowserRouter>
        </Provider>
      );
    },
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders thumbs (data has items)", async () => {
      const page = canvas.getByTestId("home-page");
      expect(page).toBeInTheDocument();
      const nav = canvas.getByTestId("nav-thumbs");
      expect(nav).toBeInTheDocument();
      const links = await canvas.findAllByRole("link");
      const thumbs = links.filter((item) => {
        return item.getAttribute("href")?.includes("/project/");
      });
      expect(thumbs.length).toBeGreaterThan(0);
    });
  },
};

// -----------------------------------------------------------------------------

const makeSelectionState = {
  mainData: {
    data: null,
    errors: undefined,
    loading: false,
    loaded: true,
    rejected: false,
  },
  home: {
    ...homeInitialState,
    displayThumbs: [],
  },
};

export const MakeSelection: Story = {
  decorators: [
    (Story) => {
      return (
        <Provider store={setupStore(undefined, makeSelectionState)}>
          <BrowserRouter>{Story()}</BrowserRouter>
        </Provider>
      );
    },
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders make a selection", async () => {
      const makeSelection = canvas.getByTestId("home-nothumbs");
      expect(makeSelection).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------
