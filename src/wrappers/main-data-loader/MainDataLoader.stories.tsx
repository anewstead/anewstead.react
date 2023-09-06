import React from "react";

import { expect } from "@storybook/jest";
import { waitForElementToBeRemoved, within } from "@storybook/testing-library";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import {
  mswLoadMainDataNoContent,
  mswLoadMainDataReject,
} from "../../../test-utils/msw/handlers/mswLoadMainData";
import { setupStore } from "../../state/store";

import MainDataLoader from "./MainDataLoader";

import type { IFetchMainDataState } from "../../state/main-data/state";
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
    errors: undefined,
    loading: false,
    loaded: false,
    rejected: false,
  } satisfies IFetchMainDataState,
};

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
        expect(spinner).toBeInTheDocument();
        await waitForElementToBeRemoved(spinner);
        const content = canvas.getByTestId("child-content");
        expect(content).toBeInTheDocument();
      }
    );
  },
};

// -----------------------------------------------------------------------------

export const LoadRejected: Story = {
  ...Template,
  parameters: {
    msw: {
      handlers: [mswLoadMainDataReject],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      "renders spinner, removes it, renders failed message",
      async () => {
        const spinner = canvas.getByTestId("maindata-spinner");
        expect(spinner).toBeInTheDocument();
        await waitForElementToBeRemoved(spinner);
        const content = canvas.getByTestId("maindata-failed");
        expect(content).toBeInTheDocument();
      }
    );
  },
};

// -----------------------------------------------------------------------------

export const LoadedError: Story = {
  ...Template,
  parameters: {
    msw: {
      handlers: [mswLoadMainDataNoContent],
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step(
      "renders spinner, removes it, renders loaded error message",
      async () => {
        const spinner = canvas.getByTestId("maindata-spinner");
        expect(spinner).toBeInTheDocument();
        await waitForElementToBeRemoved(spinner);
        const content = canvas.getByTestId("maindata-failed");
        expect(content).toBeInTheDocument();
      }
    );
  },
};
