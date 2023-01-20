import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import InFrame from "./InFrame";

export default {
  component: InFrame,
} as ComponentMeta<typeof InFrame>;

const Template: ComponentStory<typeof InFrame> = (args) => {
  return <InFrame {...args} />;
};
// do not set this iframe size to a banner size
// otherwise the adblocker may block it entirely
export const AsSite = Template.bind({});
AsSite.args = {
  title: "as site",
  width: "90%",
  height: "90%",
  iframeURL: "logo512.png",
  failOverImageURL: "",
  checkAdBlock: false,
};

export const AsBanner = Template.bind({});
AsBanner.args = {
  title: "as banner",
  width: "90%",
  height: "90%",
  iframeURL: "logo512.png",
  failOverImageURL: "logo192.png",
  checkAdBlock: true,
};
