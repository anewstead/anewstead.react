import React from "react";
import { BrowserRouter } from "react-router-dom";
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import HeaderNav from "./HeaderNav";
import store from "../../core/state/store";
import theme from "../../wrappers/theme-wrapper/theme.style";
import type { AppState } from "../../core/state/store";
import {
  initThemeName,
  retreiveThemeName,
} from "../../wrappers/theme-wrapper/helpers";
import { waitForTimeout } from "../../../test-utils/waitFor";

const TITLE = "test title 123";
const SUB_TITLE = "test subtitle 456";

type Story = StoryObj<typeof HeaderNav>;
const meta: Meta<typeof HeaderNav> = {
  component: HeaderNav,
};
export default meta;

export const Default: Story = {
  decorators: [
    (Story) => {
      return (
        <Provider store={store}>
          <BrowserRouter>{Story()}</BrowserRouter>
        </Provider>
      );
    },
  ],
  args: {
    titleText: TITLE,
    subtitleText: SUB_TITLE,
    navType: "thumbs",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const nav = await canvas.getByTestId("nav-thumbs");
    const elemWithBG = nav.firstChild;
    const bgLight = theme.light.palette.background.paper;
    const bgDark = theme.dark.palette.background.paper;

    await step("it toggles theme", async () => {
      const currentBg = initThemeName();
      expect(elemWithBG).toHaveStyle({
        "background-color": currentBg === "dark" ? bgDark : bgLight,
      });
      const themeBtn = canvas.getByTestId("nav-thumbs-theme-button");
      await userEvent.click(themeBtn);
      await waitForTimeout(500);
      const updatedBg = retreiveThemeName();
      expect(elemWithBG).toHaveStyle({
        "background-color": updatedBg === "dark" ? bgDark : bgLight,
      });
      await userEvent.click(themeBtn!); // toggle back
    });

    await step("it clicks about btn", async () => {
      const aboutBtn = canvas.getByTestId("nav-thumbs-about-button");
      await userEvent.click(aboutBtn);
    });

    await step("it clicks checkboxes", async () => {
      const group = canvas.getByTestId("nav-thumbs-desktop-checkbox");
      const checkbox = within(group!).getAllByRole("checkbox");
      expect(checkbox.length).toBeGreaterThan(0);
      const cbState1 = (store.getState() as AppState).home.nav.checkboxes;
      await userEvent.click(checkbox[0]);
      const cbState2 = (store.getState() as AppState).home.nav.checkboxes;
      expect(cbState2).not.toEqual(cbState1);
    });
  },
};

export const DetailPage: Story = {
  ...Default,
  args: {
    titleText: TITLE,
    subtitleText: SUB_TITLE,
    navType: "detail",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const nav = await canvas.getByTestId("nav-detail");
    const elemWithBG = nav.firstChild;
    const bgLight = theme.light.palette.background.paper;
    const bgDark = theme.dark.palette.background.paper;

    await step("it toggles theme", async () => {
      const currentBg = initThemeName();
      expect(elemWithBG).toHaveStyle({
        "background-color": currentBg === "dark" ? bgDark : bgLight,
      });
      const themeBtn = canvas.getByTestId("nav-detail-theme-button");
      await userEvent.click(themeBtn);
      await waitForTimeout(500);
      const updatedBg = retreiveThemeName();
      expect(elemWithBG).toHaveStyle({
        "background-color": updatedBg === "dark" ? bgDark : bgLight,
      });
      await userEvent.click(themeBtn!); // toggle back
    });

    await step("it clicks home btn", async () => {
      const homeBtn = canvas.getByTestId("nav-detail-home-button");
      await userEvent.click(homeBtn);
    });
  },
};
