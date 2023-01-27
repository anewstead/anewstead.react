import type { Meta, StoryObj } from "@storybook/react";

import Video from "./Video";
import { BASE_CONTENT_URL, BASE_VIDEO_URL } from "../../core/const";

const videoURL = `${BASE_VIDEO_URL}1GMvNvQmYZI1AM8GRXR452LFvsebsz0JC`;
const posterURL = `${BASE_CONTENT_URL}img/poster/seat_leon.jpg`;

type Story = StoryObj<typeof Video>;
const meta: Meta<typeof Video> = {
  component: Video,
};
export default meta;

export const Default: Story = {
  args: {
    videoURL,
    posterURL,
  },
};
