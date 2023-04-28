import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";

import Video from "./Video";
import { BASE_CONTENT_URL, BASE_VIDEO_URL } from "../../const";

// -----------------------------------------------------------------------------
const meta: Meta<typeof Video> = {
  component: Video,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const videoURL = `${BASE_VIDEO_URL}1GMvNvQmYZI1AM8GRXR452LFvsebsz0JC`;
const posterURL = `${BASE_CONTENT_URL}img/poster/seat_leon.jpg`;

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
