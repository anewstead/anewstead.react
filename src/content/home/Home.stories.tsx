import React from "react";
import { BrowserRouter } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import Home from "./Home";
import type { IMainData } from "../../state/main-data/state";
import { initialState as homeInitialState } from "../../state/home/state";
import { mainDataMock } from "../../../test-utils/msw/mockJson";
import { setupStore } from "../../state/store";

const MAIN_DATA: IMainData[] = JSON.parse(JSON.stringify(mainDataMock));

// -----------------------------------------------------------------------------
const meta: Meta<typeof Home> = {
  component: Home,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const defaultState = {
  mainData: {
    loading: false,
    loaded: true,
    error: false,
    data: MAIN_DATA,
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
    loading: false,
    loaded: true,
    error: false,
    data: [],
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
