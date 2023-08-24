import { expect } from "@storybook/jest";

import Video from "./Video";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof Video> = {
  component: Video,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const videoURL = "https://media.graphassets.com/lVCbqtaQqCpJkGFGwAfh";
const posterURL =
  "https://media.graphassets.com/output=format:jpg/wCOOr73TwuCKcBLKAdSO";

// -----------------------------------------------------------------------------

export const Default: Story = {
  args: {
    videoURL,
    posterURL,
  },
  play: async ({ canvasElement, step }) => {
    await step("renders a video object", async () => {
      const vid = canvasElement.querySelector("video");
      expect(vid).toBeInTheDocument();
    });
  },
};
