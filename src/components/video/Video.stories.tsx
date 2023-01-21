import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Video from "./Video";
import { BASE_CONTENT_URL, BASE_VIDEO_URL } from "../../core/const";

const videoURL = `${BASE_VIDEO_URL}1GMvNvQmYZI1AM8GRXR452LFvsebsz0JC`;
const posterURL = `${BASE_CONTENT_URL}img/poster/seat_leon.jpg`;

export default {
  component: Video,
} as ComponentMeta<typeof Video>;

const Template: ComponentStory<typeof Video> = (args) => {
  return <Video {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  videoURL,
  posterURL,
};
