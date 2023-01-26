import type { Meta, StoryObj } from "@storybook/react";

import HeaderNavDetail from "./HeaderNavDetail";

const TITLE = "test title 123";
const SUB_TITLE = "test subtitle 456";
const DUMMY = () => {};

type Story = StoryObj<typeof HeaderNavDetail>;
const meta: Meta<typeof HeaderNavDetail> = {
  component: HeaderNavDetail,
};
export default meta;

export const Default: Story = {
  args: {
    titleText: TITLE,
    subtitleText: SUB_TITLE,
    onHomeClick: DUMMY,
    onThemeClick: DUMMY,
  },
};
