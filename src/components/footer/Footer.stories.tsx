import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import Footer from "./Footer";

export default {
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => {
  return <Footer {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  brand: "brand",
};
