import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const TEXT = args.brand;
    const DATE = new Date().getFullYear();
    const footer = canvas.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent(`© ${TEXT} ${DATE}`);
  },
};
