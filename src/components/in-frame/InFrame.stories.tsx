import type { Meta, StoryObj } from "@storybook/react";
import { rest } from "msw";

import InFrame from "./InFrame";
import { adBlockTestURL } from "../../hooks/useDetectAdBlock";
import { mswDetectAdBlockBlocked } from "../../services/__mocks__/detectAdBlockHandlers";

// -----------------------------------------------------------------------------
const meta: Meta<typeof InFrame> = {
  component: InFrame,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

export const AsSite: Story = {
  args: {
    title: "as site",
    width: "600px",
    height: "520px",
    iframeURL: "logo512.png",
    failOverImageURL: "",
    checkAdBlock: false,
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
};

// -----------------------------------------------------------------------------

export const AsBannerNotBlocked: Story = {
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
      handlers: [
        rest.head(adBlockTestURL, (req, res, ctx) => {
          return res(ctx.status(200));
        }),
      ],
    },
  },
};
