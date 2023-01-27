import type { Meta, StoryObj } from "@storybook/react";

import Footer from "./Footer";

type Story = StoryObj<typeof Footer>;
const meta: Meta<typeof Footer> = {
  component: Footer,
};
export default meta;

export const Default: Story = {
  args: {
    brand: "brand",
  },
};
