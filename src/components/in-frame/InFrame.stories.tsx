import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { waitFor, within } from "@storybook/testing-library";

import InFrame from "./InFrame";
import { mswDetectAdBlockBlocked } from "../../../test-utils/msw/handlers/mswDetectAdBlock";

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
    await step("it renders an iframe", async () => {
      await waitFor(() => {
        const iframe = canvas.getByTestId("inframe-iframe");
        expect(iframe).toBeInTheDocument();
      });
    });
  },
};

// -----------------------------------------------------------------------------

export const AdBannerBlocked: Story = {
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
    await step("it renders a failover", async () => {
      await waitFor(() => {
        const failover = canvas.getByTestId("inframe-failover");
        expect(failover).toBeInTheDocument();
      });
    });
  },
};

// -----------------------------------------------------------------------------

export const AdBannerNotBlocked: Story = {
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
    await step("it renders an iframe", async () => {
      await waitFor(() => {
        const iframe = canvas.getByTestId("inframe-iframe");
        expect(iframe).toBeInTheDocument();
      });
    });
  },
};
