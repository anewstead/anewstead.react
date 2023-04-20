import type { Meta, StoryObj } from "@storybook/react";

import InFrame from "./InFrame";

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
    width: "90%",
    height: "90%",
    iframeURL: "logo512.png",
    failOverImageURL: "",
    checkAdBlock: false,
  },
};

// -----------------------------------------------------------------------------

export const AsBanner: Story = {
  args: {
    title: "as banner",
    width: "90%",
    height: "90%",
    iframeURL: "logo512.png",
    failOverImageURL: "logo192.png",
    checkAdBlock: true,
  },
};
