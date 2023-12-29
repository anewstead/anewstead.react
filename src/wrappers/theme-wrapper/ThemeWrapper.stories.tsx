import React from "react";

import { Button, useTheme } from "@mui/material";
import { within, userEvent, expect } from "@storybook/test";

import { waitForTimeout } from "@testing/waitFor";

import { retrieveThemeName } from "./helpers";
import { ThemeWrapper } from "./ThemeWrapper";
import { useThemeWrapperContext } from "./ThemeWrapperContext";

import type { Meta, StoryObj } from "@storybook/react";

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
    // note. includes timeouts to allow theme redraw
    const canvas = within(canvasElement);
    await step("toggles the theme", async () => {
      const btn = await canvas.findByRole("button");
      await waitForTimeout(5);
      const currentName = retrieveThemeName();
      const currentColor = btn.style.backgroundColor;
      await userEvent.click(btn);
      await waitForTimeout(5);
      const updatedName = retrieveThemeName();
      const updatedColor = btn.style.backgroundColor;
      await expect(currentName).not.toEqual(updatedName);
      await expect(currentColor).not.toEqual(updatedColor);
      await userEvent.click(btn); // toggle back
    });
  },
};
