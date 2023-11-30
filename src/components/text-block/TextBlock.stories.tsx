import { within, expect } from "@storybook/test";

import TextBlock from "./TextBlock";

import type { Meta, StoryObj } from "@storybook/react";

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
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders plain text", async () => {
      const text = canvas.getByText(args.htmlText);
      await expect(text).toBeTruthy();
    });
  },
};

// -----------------------------------------------------------------------------

export const WithHtmlText: Story = {
  args: {
    htmlText: `<p>html <b>text</b> <a href="">click</a> </p>`,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders a html link", async () => {
      const link = canvas.getByRole("link");
      await expect(link).toHaveTextContent("click");
    });
  },
};

// -----------------------------------------------------------------------------

export const WithUnsafeHtmlText: Story = {
  args: {
    htmlText: `<p onclick="alert('hello')"><em>hello</em></p>`,
  },
  play: async ({ canvasElement, step }) => {
    await step("renders safely from unsafe HTML string", async () => {
      const safeHTML = "<p><em>hello</em></p>";
      await expect(canvasElement).toContainHTML(safeHTML);
    });
  },
};
