import React from "react";
import { BrowserRouter } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import NoMatch from "./NoMatch";
import store from "../../state/store";

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
      expect(page).toBeInTheDocument();
      const navDetail = canvas.getByTestId("nav-detail");
      expect(navDetail).toBeInTheDocument();
    });
  },
};
