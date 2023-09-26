import { expect } from "@storybook/jest";
import { within } from "@storybook/testing-library";

import Footer from "./Footer";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof Footer> = {
  component: Footer,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

export const Default: Story = {
  args: {
    brand: "brand",
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const TEXT = args.brand;
    const DATE = new Date().getFullYear();

    await step("it render expected content", async () => {
      const footer = canvas.getByRole("contentinfo");
      await expect(footer).toBeInTheDocument();
      await expect(footer).toHaveTextContent(`© ${TEXT} ${DATE}`);
    });
  },
};
