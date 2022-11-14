import { imgDiff } from "img-diff-js";

beforeEach(async () => {
  const PAGE_URL = "http://localhost:3000/project/1"; // known video
  const LAYOUT = "[data-testid=app-layout]";
  await jestPuppeteer.resetPage();
  await page.setViewport({ width: 800, height: 600 });
  await page.goto(PAGE_URL, { waitUntil: "networkidle0" });
  await expect(page).toMatchElement(LAYOUT);
});

test("the video plays", async () => {
  // note. video playback only in actual chrome not chromium
  const VIDEO = "video";
  const video = await page.$(VIDEO);
  const videoLoads = await page.evaluate((vid) => {
    return new Promise<boolean>((resolve) => {
      vid.addEventListener("canplay", () => {
        resolve(true);
      });
      vid.addEventListener("error", () => {
        resolve(false);
      });
      vid.play();
    });
  }, video);
  expect(videoLoads).toBeTruthy();
});

test("the video poster loaded", async () => {
  const VIDEO = "video";
  const path = "./tests/video";
  const img1 = `${path}/1.png`;
  const img2 = `${path}/2.png`;
  const imgD1 = `${path}/diff1-2.png`;
  const video = await page.$(VIDEO);
  await page.screenshot({ path: img1 });
  await page.evaluate((vid) => {
    return new Promise<void>((resolve) => {
      vid.setAttribute("poster", "");
      resolve();
    });
  }, video);
  await page.screenshot({ path: img2 });
  const diff1 = await imgDiff({
    actualFilename: img2,
    expectedFilename: img1,
    diffFilename: imgD1,
  });
  expect(diff1.imagesAreSame).toBeFalsy();
});
