import type { Meta, StoryObj } from "@storybook/react";

import TextBlock from "./TextBlock";

// -----------------------------------------------------------------------------
const meta: Meta<typeof TextBlock> = {
  component: TextBlock,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

export const WithPlainText: Story = {
  args: {
    htmlText: `html text`,
  },
};

// -----------------------------------------------------------------------------

export const WithHtmlText: Story = {
  args: {
    htmlText: `<p>html <b>text</b> <a href="">link</a> </p>`,
  },
};
