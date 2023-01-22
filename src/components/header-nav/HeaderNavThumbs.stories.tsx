import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import HeaderNavThumbs from "./HeaderNavThumbs";
import { initialState } from "../../core/state/home/state";

export default {
  component: HeaderNavThumbs,
} as ComponentMeta<typeof HeaderNavThumbs>;

const Template: ComponentStory<typeof HeaderNavThumbs> = (args) => {
  return <HeaderNavThumbs {...args} />;
};

const BRAND = "test brand 123";
const DUMMY = () => {};

export const Default = Template.bind({});
Default.args = {
  brandName: BRAND,
  checkboxData: initialState.nav.checkboxes,
  onBrandClick: DUMMY,
  onThemeClick: DUMMY,
  onCheckboxChange: DUMMY,
};
