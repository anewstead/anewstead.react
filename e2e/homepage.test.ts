import { waitForTransitionEnd } from "./helpers";

beforeEach(async () => {
  const PAGE_URL = "http://localhost:3000";
  const LAYOUT = "[data-testid=app-layout]";
  await jestPuppeteer.resetPage();
  await page.setViewport({ width: 800, height: 600 });
  await page.goto(PAGE_URL);
  await expect(page).toMatchElement(LAYOUT);
});

test("toggle the theme", async () => {
  const getBodyBGColor = async (page) => {
    const bg = await page.evaluate(() => {
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

const toggleThumbs = async (checkboxSelector: string) => {
  const THUMB_ITEMS = "[data-testid=home-page] > div > div";
  const MAKE_SELECTION = "[data-testid=home-nothumbs]";
  await expect(page).not.toMatchElement(MAKE_SELECTION);
  const checkboxes = await page.$$(checkboxSelector);
  const thumbs1 = await page.$$(THUMB_ITEMS);
  expect(thumbs1.length).toBeGreaterThan(0);
  await checkboxes[0].click();
  const thumbs2 = await page.$$(THUMB_ITEMS);
  expect(thumbs2.length).toBeLessThan(thumbs1.length);
  await checkboxes[1].click();
  const thumbs3 = await page.$$(THUMB_ITEMS);
  expect(thumbs3.length).toBeLessThan(thumbs2.length);
  await checkboxes[2].click();
  await expect(page).toMatchElement(MAKE_SELECTION);
};

test("toggle home thumbs", async () => {
  const DESK_CHECKBOXES =
    "[data-testid=nav-thumbs-desktop-checkbox] input[type=checkbox]";
  await toggleThumbs(DESK_CHECKBOXES);
});

test("mobile: open nav, toggle thumbs, close nav", async () => {
  const MOB_CHECKBOXES =
    "[data-testid=nav-thumbs-mobile-checkbox] input[type=checkbox]";
  const MENU_BUTTON = "[data-testid=nav-thumbs-menu-button]";
  const ACCORDIAN_SUMMARY = "[data-testid=nav-thumbs-accordion-summary]";
  const ACCORDIAN_DETAIL = `${ACCORDIAN_SUMMARY} + div`; // sibling div
  await page.setViewport({ width: 480, height: 640 });
  const accordionDetail = await page.$(ACCORDIAN_DETAIL);
  const height1 = await (await accordionDetail.boundingBox()).height;
  await page.click(MENU_BUTTON);
  await waitForTransitionEnd(ACCORDIAN_DETAIL);
  const height2 = await (await accordionDetail.boundingBox()).height;
  expect(height2).toBeGreaterThan(height1);
  await toggleThumbs(MOB_CHECKBOXES);
  await page.click(MENU_BUTTON);
  await waitForTransitionEnd(ACCORDIAN_DETAIL);
  const height3 = await (await accordionDetail.boundingBox()).height;
  expect(height3).toEqual(height1);
});

test("navigate to about and back home", async () => {
  const ABOUT_BUTTON = "[data-testid=nav-thumbs-about-button]";
  const HOME_BUTTON = "[data-testid=nav-detail-home-button]";
  await expect(page).toMatchElement(ABOUT_BUTTON);
  await Promise.all([page.waitForNavigation(), page.click(ABOUT_BUTTON)]);
  await expect(page).not.toMatchElement(ABOUT_BUTTON);
  await expect(page).toMatchElement(HOME_BUTTON);
  await Promise.all([page.waitForNavigation(), page.click(HOME_BUTTON)]);
  await expect(page).toMatchElement(ABOUT_BUTTON);
  await expect(page).not.toMatchElement(HOME_BUTTON);
});

test("navigate to project", async () => {
  const PROJECT_THUMB = "[data-testid=home-page] > div > div:first-of-type";
  const HOME_BUTTON = "[data-testid=nav-detail-home-button]";
  await Promise.all([page.waitForNavigation(), page.click(PROJECT_THUMB)]);
  await expect(page).not.toMatchElement(PROJECT_THUMB);
  await expect(page).toMatchElement(HOME_BUTTON);
});
