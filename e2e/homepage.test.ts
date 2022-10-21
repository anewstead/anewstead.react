const SITE_ROOT = "http://localhost:3003";

test("toggle the theme", async () => {
  await page.goto(SITE_ROOT);
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
