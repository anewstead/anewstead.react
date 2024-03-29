import { dirname } from "path";
import { fileURLToPath } from "url";

import { expect, test } from "@playwright/test";
import { imgDiff } from "img-diff-js";

import { projectVideoApp } from "@testing/msw/mockJson";

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
  const PAGE_URL = `/project/${projectVideoApp.uid}`; // known video
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(PAGE_URL, { waitUntil: "networkidle" });
  const elem = page.getByTestId("app-layout");
  await expect(elem).toBeVisible();
});

/**
 * Its generally advised to test in chromium/firefox-nightly/playwright-webkit
 * but these may not support full media playback.
 *
 * During testing we probably only need check if a working media object not all
 * the playback features. so we just listen for the "waiting" event a media
 * element fires this as soon as it tries to initiate playback e.g. video.play()
 * so regardless of what happens next we know we have a working media element
 * beyond this initial event others may not fire!
 *
 * If you need to test playback you should test in chrome/msedge
 * https://playwright.dev/docs/browsers
 */
test("the video plays", async ({ page }) => {
  const video = await page.$("video");
  const videoLoads = await page.evaluate((vid) => {
    if (!vid) {
      return Promise.reject();
    }
    return new Promise<boolean>((resolve) => {
      function removeListeners() {
        vid?.removeEventListener("waiting", handleSuccess);
        vid?.removeEventListener("waiting", handleFail);
      }
      function handleSuccess() {
        removeListeners();
        resolve(true);
      }
      function handleFail() {
        removeListeners();
        resolve(false);
      }
      vid.addEventListener("waiting", handleSuccess);
      vid.addEventListener("error", handleFail);
      vid.play().catch(() => {
        handleFail();
      });
    });
  }, video);
  expect(videoLoads).toBeTruthy();
});

test("the video poster loaded", async ({ page }) => {
  const path = `${__dirname}/tmp`;
  const img1 = `${path}/1.png`;
  const img2 = `${path}/2.png`;
  const imgD1 = `${path}/diff1-2.png`;
  const video = await page.$("video");
  // should have poster
  await page.screenshot({ path: img1 });
  await page.evaluate((vid) => {
    if (!vid) {
      return Promise.reject();
    }
    return new Promise<void>((resolve) => {
      vid.setAttribute("poster", "");
      resolve();
    });
  }, video);
  // removed poster
  await page.screenshot({ path: img2 });
  const diff1 = await imgDiff({
    actualFilename: img2,
    expectedFilename: img1,
    diffFilename: imgD1,
  });
  expect(diff1.imagesAreSame).toBeFalsy();
});
