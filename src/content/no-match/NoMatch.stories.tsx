import React from "react";

import { within, expect } from "@storybook/test";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../../state/store";

import { NoMatch } from "./NoMatch";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof NoMatch> = {
  component: NoMatch,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <BrowserRouter>{Story()}</BrowserRouter>
        </Provider>
      );
    },
  ],

  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders no match page with nav-detail", async () => {
      const page = canvas.getByTestId("nomatch-page");
      await expect(page).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      await expect(navDetail).toBeInTheDocument();
    });
  },
};
