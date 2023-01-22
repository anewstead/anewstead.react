import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import HeaderNavDetail from "./HeaderNavDetail";

const TITLE = "test title 123";
const SUB_TITLE = "test subtitle 456";
const DUMMY = () => {};

export default {
  component: HeaderNavDetail,
} as ComponentMeta<typeof HeaderNavDetail>;

const Template: ComponentStory<typeof HeaderNavDetail> = (args) => {
  return <HeaderNavDetail {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  titleText: TITLE,
  subtitleText: SUB_TITLE,
  onHomeClick: DUMMY,
  onThemeClick: DUMMY,
};
