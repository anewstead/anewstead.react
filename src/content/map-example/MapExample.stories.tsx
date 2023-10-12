import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import { MapExample } from "./MapExample";

import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof MapExample> = {
  component: MapExample,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const map = await canvas.findByTestId("map");
    await step("render a map", async () => {
      await expect(map).toBeInTheDocument();
    });
    const markers = await canvas.findAllByLabelText("Map marker");
    await step("has a marker", async () => {
      await expect(markers[0]).toBeInTheDocument();
    });
    const popups = map.getElementsByClassName("mapboxgl-popup");
    await step("clicks a marker to display a popup", async () => {
      await userEvent.click(markers[0]);
      await expect(popups[0]).toBeInTheDocument();
    });
    const closeBtns = popups[0].getElementsByClassName(
      "mapboxgl-popup-close-button"
    );
    await step("removes the popup", async () => {
      await userEvent.click(closeBtns[0]);
      await expect(popups).toHaveLength(0);
    });
  },
};

// -----------------------------------------------------------------------------

export const DataFail: Story = {
  args: {
    dataSetID: "unknown-dataset-id",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const fail = await canvas.findByTestId("failover");
    await step("catches load error", async () => {
      await expect(fail).toBeInTheDocument();
    });
  },
};

// -----------------------------------------------------------------------------
