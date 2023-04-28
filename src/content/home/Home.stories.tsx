import React from "react";
import { BrowserRouter } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import Home from "./Home";
// import { homeReducer } from "../../state/home/slice";
import { initialState } from "../../state/home/state";
import { setupStore } from "../../state/store";

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
    data: [],
  },
  home: {
    ...initialState,
    displayThumbs: [],
  },
};
// const store = setupStore(undefined, defaultState);

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
    await step("renders nothumbs (data has no items)", async () => {
      const page = canvas.getByTestId("home-page");
      expect(page).toBeInTheDocument();
      const nav = canvas.getByTestId("nav-thumbs");
      expect(nav).toBeInTheDocument();
    });
  },
};

const thumbState = {
  mainData: {
    loading: false,
    loaded: true,
    error: false,
    data: [],
  },
  home: {
    ...initialState,
    displayThumbs: [],
  },
};

export const WithThumb: Story = {
  decorators: [
    (Story) => {
      return (
        <Provider store={setupStore(undefined, thumbState)}>
          <BrowserRouter>{Story()}</BrowserRouter>
        </Provider>
      );
    },
  ],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders nothumbs (data has no items)", async () => {
      const page = canvas.getByTestId("home-page");
      expect(page).toBeInTheDocument();
      const nav = canvas.getByTestId("nav-thumbs");
      expect(nav).toBeInTheDocument();
    });
  },
};

// "renders unset (data 'undefined')"
// "renders nothumbs (data has no items)"
// "renders thumbs (data has items)"
