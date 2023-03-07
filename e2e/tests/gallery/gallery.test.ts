import { imgDiff } from "img-diff-js";

import { waitFor } from "../helpers";

beforeEach(async () => {
  const PAGE_URL = "http://localhost:3000/project/0"; // known gallery
  const LAYOUT = "[data-testid=app-layout]";
  await jestPuppeteer.resetPage();
  await page.setViewport({ width: 800, height: 600 });
  await page.goto(PAGE_URL, { waitUntil: "networkidle0" });
  await expect(page).toMatchElement(LAYOUT);
});

test("gallery next prev", async () => {
  const PREV_BUTTON = "button[aria-label=prev]";
  const NEXT_BUTTON = "button[aria-label=next]";

  const SLICK_LIST = ".slick-list";
  const path = "./tests/gallery";
  const img1 = `${path}/1.png`;
  const img2 = `${path}/2.png`;
  const img3 = `${path}/3.png`;
  const imgD1 = `${path}/diff1-2.png`;
  const imgD2 = `${path}/diff1-3.png`;
  await page.screenshot({ path: img1 });

  await Promise.all([page.click(NEXT_BUTTON), waitFor(1000)]);
  await page.click(SLICK_LIST); // to hide prev-next button rollover
  await page.screenshot({ path: img2 });

  await Promise.all([page.click(PREV_BUTTON), waitFor(1000)]);
  await page.click(SLICK_LIST);
  await page.screenshot({ path: img3 });

  const diff1 = await imgDiff({
    actualFilename: img2,
    expectedFilename: img1,
    diffFilename: imgD1,
  });
  const diff2 = await imgDiff({
    actualFilename: img3,
    expectedFilename: img1,
    diffFilename: imgD2,
  });
  expect(diff1.imagesAreSame).toBeFalsy();
  expect(diff2.imagesAreSame).toBeTruthy();
});
