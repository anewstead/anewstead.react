import { dirname } from "path";
import { fileURLToPath } from "url";

import { expect, test } from "@playwright/test";
import { imgDiff } from "img-diff-js";

import { projectGalleryWebsite } from "../../../test-utils/msw/mockJson";
import { waitForTimeout } from "../../../test-utils/waitFor";

/**
 * https://nodejs.org/api/esm.html#importmeta\
 * The built in __dirname is node cjs not esm\
 * Import.meta.dirname available node 21.2.0\
 * Until that node version is LTS and is an option on live server\
 * We need the following import.meta.url workaround
 */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.beforeEach(async ({ page }) => {
  const PAGE_URL = `/project/${projectGalleryWebsite.uid}`;
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(PAGE_URL, { waitUntil: "networkidle" });
  const elem = page.getByTestId("app-layout");
  await expect(elem).toBeVisible();
});

test("gallery next prev", async ({ page }) => {
  const PREV_BUTTON = "button[aria-label=prev]";
  const NEXT_BUTTON = "button[aria-label=next]";
  const SLICK_LIST = ".slick-list";
  const path = `${__dirname}/tmp`;
  const img1 = `${path}/1.png`;
  const img2 = `${path}/2.png`;
  const img3 = `${path}/3.png`;
  const imgD1 = `${path}/diff1-2.png`;
  const imgD2 = `${path}/diff1-3.png`;
  await page.screenshot({ path: img1, animations: "disabled" });

  await page.click(NEXT_BUTTON);
  await page.waitForLoadState("networkidle"); // image loaded
  await waitForTimeout(250); // race condition

  await page.click(SLICK_LIST); // to hide prev-next button rollover
  await page.screenshot({ path: img2, animations: "disabled" });

  await page.click(PREV_BUTTON);
  await page.waitForLoadState("networkidle");
  await waitForTimeout(250);

  await page.click(SLICK_LIST);
  await page.screenshot({ path: img3, animations: "disabled" });

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
