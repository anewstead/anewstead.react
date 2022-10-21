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
  const makeSelection1 = await page.$(MAKE_SELECTION);
  expect(makeSelection1).toBeFalsy();
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
  const makeSelection2 = await page.$(MAKE_SELECTION);
  expect(makeSelection2).toBeTruthy();
});
