const SITE_ROOT = "http://localhost:3003";

beforeEach(async () => {
  await jestPuppeteer.resetPage();
  await page.goto(SITE_ROOT);
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

test("toggle home thumbs", async () => {
  const NAV_CHECKBOXES =
    "[data-testid=nav-thumbs-desktop-checkbox] input[type=checkbox]";
  const THUMB_ITEMS = "[data-testid=home-page] > div > div";
  const MAKE_SELECTION = "[data-testid=home-nothumbs]";
  await expect(page).not.toMatchElement(MAKE_SELECTION);
  const checkboxes = await page.$$(NAV_CHECKBOXES);
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
