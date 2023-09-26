import React from "react";

import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import store from "../../state/store";

import About from "./About";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof About> = {
  component: About,
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
    await step("renders about page with nav-detail", async () => {
      const page = canvas.getByTestId("about-page");
      await expect(page).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      await expect(navDetail).toBeInTheDocument();
    });
  },
};
