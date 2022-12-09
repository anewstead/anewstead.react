import React from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import TextBlock from "./TextBlock";

export default {
  component: TextBlock,
} as ComponentMeta<typeof TextBlock>;

const Template: ComponentStory<typeof TextBlock> = (args) => {
  return <TextBlock {...args} />;
};

export const WithPlainText = Template.bind({});
WithPlainText.args = {
  htmlText: `html text`,
};

export const WithHtmlText = Template.bind({});
WithHtmlText.args = {
  htmlText: `<p>html <b>text</b> <a href="">link</a> </p>`,
};
