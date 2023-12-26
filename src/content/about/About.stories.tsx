import React from "react";

import { within, expect } from "@storybook/test";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { sampleAllData } from "../../../test-utils/msw/mockJson";
import { setupStore } from "../../state/store";

import { About } from "./About";

import type { AppState } from "../../state/store";
import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof About> = {
  component: About,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const defaultState = {
  mainData: {
    data: sampleAllData,
    error: null,
    loading: false,
    loaded: true,
  },
} as AppState;

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
    await step("renders about page with nav-detail", async () => {
      const page = canvas.getByTestId("about-page");
      await expect(page).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      await expect(navDetail).toBeInTheDocument();
    });
  },
};
