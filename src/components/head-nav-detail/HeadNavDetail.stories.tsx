import { expect, jest } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import { waitForTimeout } from "../../../test-utils/waitFor";

import HeadNavDetail from "./HeadNavDetail";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof HeadNavDetail> = {
  component: HeadNavDetail,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const TITLE = "test title 123";
const SUB_TITLE = "test subtitle 456";

// -----------------------------------------------------------------------------

export const Default: Story = {
  args: {
    titleText: TITLE,
    subtitleText: SUB_TITLE,
    onHomeClick: jest.fn(),
    onThemeClick: jest.fn(),
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const homeBtn = await canvas.findByTestId("nav-detail-home-button");
    const themeBtn = await canvas.findByTestId("nav-detail-theme-button");

    await step("it handles home click", async () => {
      await userEvent.click(homeBtn);
      await expect(args.onHomeClick).toHaveBeenCalled();
    });

    await step("it handles theme click", async () => {
      await userEvent.click(themeBtn);
      await expect(args.onThemeClick).toHaveBeenCalled();
    });
  },
};

// -----------------------------------------------------------------------------

export const Mobile: Story = {
  args: {
    titleText: TITLE,
    subtitleText: SUB_TITLE,
    onHomeClick: jest.fn(),
    onThemeClick: jest.fn(),
  },
  parameters: {
    viewport: {
      defaultViewport: "extraSmall",
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitForTimeout(500); // viewport plugin

    await step("render on mobile", async () => {
      const title = canvas.getByText(TITLE);
      expect(title).toHaveClass("MuiTypography-h6");
      const subTitle = canvas.getByText(SUB_TITLE);
      expect(subTitle).toHaveClass("MuiTypography-h6");
    });
  },
};
