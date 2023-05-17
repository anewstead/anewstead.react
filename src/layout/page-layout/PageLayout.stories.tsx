import React from "react";
import { BrowserRouter } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import PageLayout from "./PageLayout";
import store from "../../state/store";

// -----------------------------------------------------------------------------
const meta: Meta<typeof PageLayout> = {
  component: PageLayout,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const divStyle = {
  height: "100px",
  width: "100%",
  padding: "20px",
  margin: "20px 0  20px 0",
  border: "solid 1px blue",
};

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
  render: (args) => {
    return (
      <PageLayout {...args}>
        <div style={divStyle} data-testid="dummy-content">
          Lorem ipsum
        </div>
      </PageLayout>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      "renders layout with nav, footer and dummy content",
      async () => {
        const pageLayout = canvas.getByTestId("app-layout");
        expect(pageLayout).toBeInTheDocument();
        const nav = canvas.getByTestId("nav-detail");
        expect(nav).toBeInTheDocument();
        const content = canvas.getByTestId("dummy-content");
        expect(content).toBeInTheDocument();
        const footer = canvas.getByRole("contentinfo");
        expect(footer).toBeInTheDocument();
      }
    );
  },
};
