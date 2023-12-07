import React from "react";

import { within, expect, waitForElementToBeRemoved } from "@storybook/test";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import {
  mswLoadMainDataError,
  mswLoadMainDataGqlError,
} from "../../../test-utils/msw/handlers/mswLoadMainData";
import { setupStore } from "../../state/store";

import MainDataLoader from "./MainDataLoader";

import type { IFetchMainDataState } from "../../state/main-data/state";
import type { AppState } from "../../state/store";
import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof MainDataLoader> = {
  component: MainDataLoader,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const defaultState = {
  mainData: {
    data: null,
    error: null,
    loading: false,
    loaded: false,
  } satisfies IFetchMainDataState,
} as AppState;

const Template: Story = {
  decorators: [
    (Story) => {
      return (
        <Provider store={setupStore(undefined, defaultState)}>
          <BrowserRouter>{Story()}</BrowserRouter>
        </Provider>
      );
    },
  ],
  render: (args) => {
    return (
      <MainDataLoader {...args}>
        <div data-testid="child-content">Default content</div>
      </MainDataLoader>
    );
  },
};

export const Default: Story = {
  ...Template,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      "renders spinner, removes it and renders child-content",
      async () => {
        const spinner = canvas.getByTestId("maindata-spinner");
        await expect(spinner).toBeInTheDocument();
        await waitForElementToBeRemoved(spinner);
        const content = canvas.getByTestId("child-content");
        await expect(content).toBeInTheDocument();
      }
    );
  },
};

// -----------------------------------------------------------------------------

export const LoadError: Story = {
  ...Template,
  parameters: {
    msw: {
      handlers: [mswLoadMainDataError],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      "renders spinner, removes it, renders loaded error message",
      async () => {
        const spinner = canvas.getByTestId("maindata-spinner");
        await expect(spinner).toBeInTheDocument();
        await waitForElementToBeRemoved(spinner);
        const content = canvas.getByTestId("maindata-failed");
        await expect(content).toBeInTheDocument();
      }
    );
  },
};

// -----------------------------------------------------------------------------

export const LoadGqlError: Story = {
  ...Template,
  parameters: {
    msw: {
      handlers: [mswLoadMainDataGqlError],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      "renders spinner, removes it, renders failed message",
      async () => {
        const spinner = canvas.getByTestId("maindata-spinner");
        await expect(spinner).toBeInTheDocument();
        await waitForElementToBeRemoved(spinner);
        const content = canvas.getByTestId("maindata-failed");
        await expect(content).toBeInTheDocument();
      }
    );
  },
};
