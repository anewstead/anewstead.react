import { expect, test } from "@playwright/test";

import { waitForTransitionPW } from "../../test-utils/waitFor";

test.beforeEach(async ({ page }) => {
  const PAGE_URL = "http://localhost:3003";
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(PAGE_URL, { waitUntil: "networkidle" });
  const elem = await page.getByTestId("app-layout");
  await expect(elem).toBeVisible();
});

test("toggle the theme", async ({ page }) => {
  const getBodyBGColor = async (pg) => {
    const bg = await pg.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    return bg;
  };
  const THEME_BUTTON = "button[aria-label=theme]";
  const bg1 = await getBodyBGColor(page);
  await page.click(THEME_BUTTON);
  const bg2 = await getBodyBGColor(page);
  await page.click(THEME_BUTTON);
  const bg3 = await getBodyBGColor(page);
  expect(bg1).not.toMatch(bg2);
  expect(bg1).toMatch(bg3);
});

const toggleThumbs = async (page, checkboxSelector) => {
  const THUMB_ITEMS = "[data-testid=home-page] > div > div";
  const MAKE_SELECTION = "home-nothumbs";
  const ms = await page.getByTestId(MAKE_SELECTION);
  await expect(ms).not.toBeVisible();
  const checkboxes = await page.locator(checkboxSelector).all();
  const thumbs1 = await page.locator(THUMB_ITEMS).all();
  expect(thumbs1.length).toBeGreaterThan(0);
  await checkboxes[0].click();
  const thumbs2 = await page.locator(THUMB_ITEMS).all();
  expect(thumbs2.length).toBeLessThan(thumbs1.length);
  await checkboxes[1].click();
  const thumbs3 = await page.locator(THUMB_ITEMS).all();
  expect(thumbs3.length).toBeLessThan(thumbs2.length);
  await checkboxes[2].click();
  const ms2 = await page.getByTestId(MAKE_SELECTION);
  await expect(ms2).toBeVisible();
};

test("toggle home thumbs", async ({ page }) => {
  const DESK_CHECKBOXES =
    "[data-testid=nav-thumbs-desktop-checkbox] input[type=checkbox]";
  await toggleThumbs(page, DESK_CHECKBOXES);
});

test("mobile: open nav, toggle thumbs, close nav", async ({ page }) => {
  const MOB_CHECKBOXES =
    "[data-testid=nav-thumbs-mobile-checkbox] input[type=checkbox]";
  const MENU_BUTTON = "[data-testid=nav-thumbs-menu-button]";
  const ACCORDIAN_DETAIL = "[data-testid=nav-thumbs-accordion-summary] + div";
  await page.setViewportSize({ width: 480, height: 640 });
  const accordionDetail = await page.locator(ACCORDIAN_DETAIL);
  expect(accordionDetail).toHaveCount(1);
  const bb1 = await accordionDetail.boundingBox();
  page.click(MENU_BUTTON);
  await waitForTransitionPW(page, ACCORDIAN_DETAIL);
  const bb2 = await accordionDetail.boundingBox();
  expect(bb2!.height).toBeGreaterThan(bb1!.height);
  await toggleThumbs(page, MOB_CHECKBOXES);
  page.click(MENU_BUTTON);
  await waitForTransitionPW(page, ACCORDIAN_DETAIL);
  const bb3 = await accordionDetail.boundingBox();
  expect(bb3).toEqual(bb1);
});

test("navigate to about and back home", async ({ page }) => {
  const ABOUT_BUTTON = "[data-testid=nav-thumbs-about-button]";
  const HOME_BUTTON = "[data-testid=nav-detail-home-button]";
  await expect(page.locator(ABOUT_BUTTON)).toBeVisible();
  await page.click(ABOUT_BUTTON);
  await expect(page.locator(ABOUT_BUTTON)).not.toBeVisible();
  await expect(page.locator(HOME_BUTTON)).toBeVisible();
  await page.click(HOME_BUTTON);
  await expect(page.locator(ABOUT_BUTTON)).toBeVisible();
  await expect(page.locator(HOME_BUTTON)).not.toBeVisible();
});

test("navigate to project", async ({ page }) => {
  const PROJECT_THUMB = "[data-testid=home-page] > div > div:first-of-type";
  const HOME_BUTTON = "[data-testid=nav-detail-home-button]";
  await page.click(PROJECT_THUMB);
  await expect(page.locator(PROJECT_THUMB)).not.toBeVisible();
  await expect(page.locator(HOME_BUTTON)).toBeVisible();
});
