import React from "react";
import { BrowserRouter } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import About from "./About";
import store from "../../core/state/store";

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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const aboutPage = canvas.getByTestId("about-page");
    expect(aboutPage).toBeInTheDocument();
    const navDetail = canvas.getByTestId("nav-detail");
    expect(navDetail).toBeInTheDocument();
  },
};
