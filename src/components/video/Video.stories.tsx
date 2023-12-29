import { expect } from "@storybook/test";

import { posterURL, videoURL } from "@testing/msw/mockJson";

import { Video } from "./Video";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof Video> = {
  component: Video,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

export const Default: Story = {
  args: {
    videoURL,
    posterURL,
  },
  play: async ({ canvasElement, step }) => {
    await step("renders a video object", async () => {
      const vid = canvasElement.querySelector("video");
      await expect(vid).toBeInTheDocument();
    });
  },
};
