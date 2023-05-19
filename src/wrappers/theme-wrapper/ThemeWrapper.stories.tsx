import React from "react";
import { Button, useTheme } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import ThemeWrapper from "./ThemeWrapper";
import theme from "./theme.style";
import { initThemeName, retreiveThemeName } from "./helpers";
import { useThemeWrapperContext } from "./ThemeWrapperContext";
import { waitForTimeout } from "../../../test-utils/waitFor";

// -----------------------------------------------------------------------------
const meta: Meta<typeof ThemeWrapper> = {
  component: ThemeWrapper,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const TestComponent = () => {
  const { toggleTheme } = useThemeWrapperContext();
  const utheme = useTheme();
  return (
    <Button
      onClick={() => {
        toggleTheme();
      }}
      style={{ backgroundColor: utheme.palette.background.paper }}
    >
      TOGGLE THEME
    </Button>
  );
};

export const Default: Story = {
  parameters: {
    removeGlobalThemeDecorator: true,
  },
  render: () => {
    return (
      <ThemeWrapper>
        <TestComponent />
      </ThemeWrapper>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("toggles the theme", async () => {
      const currentBg = initThemeName();
      const bgLight = theme.light.palette.background.paper;
      const bgDark = theme.dark.palette.background.paper;
      const btn = canvas.getByRole("button");
      expect(btn).toBeInTheDocument();
      const elemWithBG = btn;
      expect(elemWithBG).toHaveStyle({
        "background-color": currentBg === "dark" ? bgDark : bgLight,
      });
      await userEvent.click(btn);
      await waitForTimeout(500);
      const updatedBg = retreiveThemeName();
      expect(elemWithBG).toHaveStyle({
        "background-color": updatedBg === "dark" ? bgDark : bgLight,
      });
      await userEvent.click(btn); // toggle back
    });
  },
};
