import { expect, jest } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import { waitForTimeout } from "../../../test-utils/waitFor";
import { initialState } from "../../state/home/state";

import HeadNavThumbs from "./HeadNavThumbs";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof HeadNavThumbs> = {
  component: HeadNavThumbs,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const BRAND = "test brand 123";

// -----------------------------------------------------------------------------

export const Default: Story = {
  args: {
    brandName: BRAND,
    checkboxData: initialState.nav.checkboxes,
    onBrandClick: jest.fn(),
    onThemeClick: jest.fn(),
    onCheckboxChange: jest.fn(),
  },
};

// -----------------------------------------------------------------------------

export const Mobile: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: "extraSmall",
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitForTimeout(500); // viewport plugin

    await step("render on mobile", async () => {
      const brand = canvas.getByText(BRAND);
      await expect(brand).toBeInTheDocument();
    });

    await step("toggles mobile nav", async () => {
      const navBtn = canvas.getByTestId("nav-thumbs-menu-button");
      await userEvent.click(navBtn);
      await waitForTimeout(1000);
      await userEvent.click(navBtn);
    });
  },
};
