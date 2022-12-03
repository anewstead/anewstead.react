import React from "react";
import { screen, within } from "@testing-library/react";

import HeaderNav from "./HeaderNav";
import renderWithProviders from "../../test-utils/renderWithProviders";
import theme from "../../wrappers/theme-wrapper/theme.style";
import type { AppState } from "../../app/state/store";

describe("headernav (detail)", () => {
  test("toggles theme", async () => {
    const { user } = renderWithProviders(<HeaderNav navType="detail" />);
    const nav = screen.getByTestId("nav-detail");
    // eslint-disable-next-line testing-library/no-node-access
    const elemWithBG = nav.firstChild;
    const bgLight = theme.light.palette.background.paper;
    const bgDark = theme.dark.palette.background.paper;
    expect(elemWithBG).toHaveStyle({ "background-color": bgLight });
    const themeBtn = screen.getByTestId("nav-detail-theme-button");
    await user.click(themeBtn!);
    expect(elemWithBG).toHaveStyle({ "background-color": bgDark });
  });

  test("navigates to home", async () => {
    const { user } = renderWithProviders(<HeaderNav navType="detail" />, {
      route: "/project",
    });
    expect(window.location.href).toEqual("http://localhost/project");
    const homeBtn = screen.getByTestId("nav-detail-home-button");
    await user.click(homeBtn!);
    expect(window.location.href).toEqual("http://localhost/");
  });
});

describe("headernav (thumbs)", () => {
  test("toggles theme", async () => {
    const { user } = renderWithProviders(<HeaderNav navType="thumbs" />);
    const nav = screen.getByTestId("nav-thumbs");
    // eslint-disable-next-line testing-library/no-node-access
    const elemWithBG = nav.firstChild;
    const bgLight = theme.light.palette.background.paper;
    const bgDark = theme.dark.palette.background.paper;
    expect(elemWithBG).toHaveStyle({ "background-color": bgLight });
    const themeBtn = screen.getByTestId("nav-thumbs-theme-button");
    await user.click(themeBtn!);
    expect(elemWithBG).toHaveStyle({ "background-color": bgDark });
  });

  test("navigates to about", async () => {
    const { user } = renderWithProviders(<HeaderNav navType="thumbs" />);
    const aboutBtn = screen.getByTestId("nav-thumbs-about-button");
    await user.click(aboutBtn);
    expect(window.location.href).toEqual("http://localhost/about");
  });

  test("toggles mobile nav and handles checkbox (mobile)", async () => {
    window.resizeTo(400, 999);
    const { user, store } = renderWithProviders(<HeaderNav navType="thumbs" />);
    const accordionSummary = screen.getByTestId("nav-thumbs-accordion-summary");
    // toggle open (makes mobile nav checkboxes accessible)
    expect(accordionSummary).toHaveAttribute("aria-expanded");
    const expState1 = accordionSummary.getAttribute("aria-expanded");
    const menuBtn = screen.getByTestId("nav-thumbs-menu-button");
    await user.click(menuBtn!);
    const expState2 = accordionSummary.getAttribute("aria-expanded");
    expect(expState2).not.toEqual(expState1);
    // click checkbox
    const group = screen.getByTestId("nav-thumbs-mobile-checkbox");
    const checkbox = within(group!).getAllByRole("checkbox");
    expect(checkbox.length).toBeGreaterThan(0);
    const cbState1 = (store.getState() as AppState).home.nav.checkboxes;
    await user.click(checkbox[0]);
    const cbState2 = (store.getState() as AppState).home.nav.checkboxes;
    expect(cbState2).not.toEqual(cbState1);
    // toggle close
    await user.click(menuBtn!);
    const expState3 = accordionSummary.getAttribute("aria-expanded");
    expect(expState3).toEqual(expState1);
  });

  test("handles checkbox (desktop)", async () => {
    const { store, user } = renderWithProviders(<HeaderNav navType="thumbs" />);
    const group = screen.getByTestId("nav-thumbs-desktop-checkbox");
    const checkbox = within(group!).getAllByRole("checkbox");
    expect(checkbox.length).toBeGreaterThan(0);
    const navState = (store.getState() as AppState).home.nav.checkboxes;
    await user.click(checkbox[0]);
    const newNavState = (store.getState() as AppState).home.nav.checkboxes;
    expect(newNavState).not.toEqual(navState);
  });
});
