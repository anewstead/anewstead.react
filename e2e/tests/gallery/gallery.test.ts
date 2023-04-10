import { expect, test } from "@playwright/test";
import { imgDiff } from "img-diff-js";

import { waitFor } from "../helpers";

test.beforeEach(async ({ page }) => {
  const PAGE_URL = "http://localhost:3003/project/0";
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(PAGE_URL, { waitUntil: "networkidle" });
  const elem = await page.getByTestId("app-layout");
  await expect(elem).toBeVisible();
});

test("gallery next prev", async ({ page }) => {
  const PREV_BUTTON = "button[aria-label=prev]";
  const NEXT_BUTTON = "button[aria-label=next]";
  const SLICK_LIST = ".slick-list";
  const path = "./tests/gallery/tmp";
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
