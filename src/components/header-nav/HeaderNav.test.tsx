import React from "react";
import { screen, within } from "@testing-library/react";

import HeaderNav from "./HeaderNav";
import renderWithProviders from "../../test-utils/renderWithProviders";
import { INIT_THEME } from "../../app/state/theme/slice";
import type { RootState } from "../../app/state/store";

describe("headernav (detail)", () => {
  test("toggles theme", async () => {
    const { store, user } = renderWithProviders(<HeaderNav navType="detail" />);
    store.dispatch(INIT_THEME());
    const initTheme = (store.getState() as RootState).theme.themeName;
    const themeBtn = screen.getByTestId("nav-detail-theme-button");
    expect(themeBtn).toBeInTheDocument();
    await user.click(themeBtn!);
    const toggleTheme = (store.getState() as RootState).theme.themeName;
    expect(toggleTheme).not.toStrictEqual(initTheme);
  });

  test("navigates to home", async () => {
    const { user } = renderWithProviders(
      <HeaderNav navType="detail" />,
      {},
      { route: "/project" }
    );
    expect(window.location.href).toEqual("http://localhost/project");
    const homeBtn = screen.getByTestId("nav-detail-home-button");
    expect(homeBtn).toBeInTheDocument();
    await user.click(homeBtn!);
    expect(window.location.href).toEqual("http://localhost/");
  });
});

// --

describe("headernav (thumbs)", () => {
  test("toggles theme", async () => {
    const { store, user } = renderWithProviders(<HeaderNav navType="thumbs" />);
    store.dispatch(INIT_THEME());
    const theme1 = (store.getState() as RootState).theme.themeName;
    const themeBtn = screen.getByTestId("nav-thumbs-theme-button");
    expect(themeBtn).toBeInTheDocument();
    await user.click(themeBtn);
    const theme2 = (store.getState() as RootState).theme.themeName;
    expect(theme2).not.toStrictEqual(theme1);
  });

  test("navigates to about", async () => {
    const { user } = renderWithProviders(<HeaderNav navType="thumbs" />);
    const aboutBtn = screen.queryAllByTestId("nav-thumbs-about-button");
    expect(aboutBtn[0]).toBeInTheDocument();
    await user.click(aboutBtn[0]);
    expect(window.location.href).toEqual("http://localhost/about");
  });

  test("toggles mobile nav and handles checkbox (mobile)", async () => {
    window.resizeTo(400, 999);
    const { user, store } = renderWithProviders(<HeaderNav navType="thumbs" />);
    const accordionSummary = await screen.findByTestId(
      "nav-thumbs-accordion-summary"
    );
    // toggle nav open (makes mobile nav checkboxes accessible)
    expect(accordionSummary).toBeInTheDocument();
    expect(accordionSummary).toHaveAttribute("aria-expanded");
    const expState1 = accordionSummary.getAttribute("aria-expanded");
    const menuBtn = screen.getByTestId("nav-thumbs-menu-button");
    expect(menuBtn).toBeInTheDocument();
    await user.click(menuBtn!);
    const expState2 = accordionSummary.getAttribute("aria-expanded");
    expect(expState2).not.toEqual(expState1);
    // click checkbox
    const group = screen.getByTestId("nav-thumbs-mobile-checkbox");
    expect(group).toBeInTheDocument();
    const checkbox = within(group!).getAllByRole("checkbox");
    expect(checkbox.length).toBeGreaterThan(0);
    const cbState1 = (store.getState() as RootState).home.nav.checkboxes;
    await user.click(checkbox[0]);
    const cbState2 = (store.getState() as RootState).home.nav.checkboxes;
    expect(cbState2).not.toEqual(cbState1);
    // toggle nav close
    await user.click(menuBtn!);
    const expState3 = accordionSummary.getAttribute("aria-expanded");
    expect(expState3).toEqual(expState1);
  });

  test("handles checkbox (desktop)", async () => {
    const { store, user } = renderWithProviders(<HeaderNav navType="thumbs" />);
    const group = screen.getByTestId("nav-thumbs-desktop-checkbox");
    expect(group).toBeInTheDocument();
    const checkbox = within(group!).getAllByRole("checkbox");
    expect(checkbox.length).toBeGreaterThan(0);
    const navState = (store.getState() as RootState).home.nav.checkboxes;
    await user.click(checkbox[0]);
    const newNavState = (store.getState() as RootState).home.nav.checkboxes;
    expect(newNavState).not.toEqual(navState);
  });
});
