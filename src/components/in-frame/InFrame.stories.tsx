import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import { mswDetectAdBlockBlocked } from "../../../test-utils/msw/handlers/mswDetectAdBlock";

import InFrame from "./InFrame";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof InFrame> = {
  component: InFrame,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

export const Default: Story = {
  args: {
    title: "as site",
    width: "600px",
    height: "520px",
    iframeURL: "logo512.png",
    failOverImageURL: "",
    checkAdBlock: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("it ignores adblock and renders an iframe", async () => {
      const iframe = await canvas.findByTestId("inframe-iframe");
      expect(iframe).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------

export const BannerBlocked: Story = {
  args: {
    title: "as banner",
    width: "600px",
    height: "200px",
    iframeURL: "logo512.png",
    failOverImageURL: "logo192.png",
    checkAdBlock: true,
  },
  parameters: {
    msw: {
      handlers: [mswDetectAdBlockBlocked],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("it checks adblock and renders a failover", async () => {
      const failover = await canvas.findByTestId("inframe-failover");
      expect(failover).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------

export const BannerNotBlocked: Story = {
  args: {
    title: "as banner",
    width: "600px",
    height: "200px",
    iframeURL: "logo192.png",
    failOverImageURL: "logo512.png",
    checkAdBlock: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("it checks adblock and renders an iframe", async () => {
      const iframe = await canvas.findByTestId("inframe-iframe");
      expect(iframe).toBeInTheDocument();
    });
  },
};
