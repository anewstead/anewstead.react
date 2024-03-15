import React from "react";

import { within, userEvent, expect } from "@storybook/test";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import {
  reactRouterParameters,
  withRouter,
} from "storybook-addon-remix-react-router";

import { store } from "@/state/store";
import { retrieveThemeName } from "@/wrappers/themeWrapper/helpers";
import { waitForTimeout } from "@testing/waitFor";

import { HeadNav } from "./HeadNav";

import type { AppState } from "@/state/store";
import type { Meta, StoryObj } from "@storybook/react";

// -----------------------------------------------------------------------------
const meta: Meta<typeof HeadNav> = {
  component: HeadNav,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const TITLE = "test title 123";
const SUB_TITLE = "test subtitle 456";

// -----------------------------------------------------------------------------

// waitForTimout to allow redraw race condition before detecting values
const testTheme = async (elemWithBG: HTMLElement, themeBtn: HTMLElement) => {
  await waitForTimeout(50);
  const currentName = retrieveThemeName();
  const currentColor = getComputedStyle(elemWithBG).backgroundColor;
  await waitForTimeout(50);
  await userEvent.click(themeBtn);
  await waitForTimeout(50);
  const updatedName = retrieveThemeName();
  const updatedColor = getComputedStyle(elemWithBG).backgroundColor;
  await waitForTimeout(50);
  await expect(currentName).not.toEqual(updatedName);
  await expect(currentColor).not.toEqual(updatedColor);
  await userEvent.click(themeBtn); // toggle back
};

export const Default: Story = {
  decorators: [
    withRouter,
    (Story) => {
      return <Provider store={store}>{Story()}</Provider>;
    },
  ],
  parameters: {
    // routing: '/about' as empty child outlet so the page does'nt navigate away on click
    reactRouter: reactRouterParameters({
      location: {
        path: "/",
      },
      routing: [
        {
          path: "/",
          useStoryElement: true,
          children: [{ path: "about", element: <Outlet /> }],
        },
      ],
    }),
  },
  args: {
    titleText: TITLE,
    subtitleText: SUB_TITLE,
    navType: "thumbs",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const nav = await canvas.findByTestId("nav-thumbs");
    const elemWithBG = nav.firstElementChild! as HTMLElement;
    const themeBtn = await canvas.findByTestId("nav-thumbs-theme-button");

    await step("it toggles theme", async () => {
      await testTheme(elemWithBG, themeBtn);
    });

    await step("it clicks about btn", async () => {
      const aboutBtn = canvas.getByTestId("nav-thumbs-about-button");
      await userEvent.click(aboutBtn);
    });

    await step("it clicks checkboxes", async () => {
      const group = canvas.getByTestId("nav-thumbs-desktop-checkbox");
      const checkbox = within(group).getAllByRole("checkbox");
      await expect(checkbox.length).toBeGreaterThan(0);
      const cbState1 = (store.getState() as AppState).home.nav.checkboxes;
      await userEvent.click(checkbox[0]);
      const cbState2 = (store.getState() as AppState).home.nav.checkboxes;
      await expect(cbState2).not.toEqual(cbState1);
    });
  },
};

// -----------------------------------------------------------------------------

export const DetailPageNav: Story = {
  ...Default,
  args: {
    titleText: TITLE,
    subtitleText: SUB_TITLE,
    navType: "detail",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByTestId("nav-detail");
    const elemWithBG = nav.firstElementChild! as HTMLElement;
    const themeBtn = await canvas.findByTestId("nav-detail-theme-button");

    await step("it toggles theme", async () => {
      await testTheme(elemWithBG, themeBtn);
    });

    await step("it clicks home btn", async () => {
      const homeBtn = canvas.getByTestId("nav-detail-home-button");
      await userEvent.click(homeBtn);
    });
  },
};
