import type { Page } from "@playwright/test";

export const waitFor = async (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

/*
wait for css transitionend, also listen for transitioncancel because 
sometimes cancel called going straight to end point but transitionend is not called. 
this happens frequently when used in the initial test on playwright/browser startup 
*/
export const waitForTransitionEnd = async (page: Page, selector: string) => {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) {
      return Promise.reject();
    }
    return new Promise<void>((resolve) => {
      const onEnd = () => {
        el.removeEventListener("transitioncancel", onEnd);
        el.removeEventListener("transitionend", onEnd);
        resolve();
      };
      el.addEventListener("transitioncancel", onEnd);
      el.addEventListener("transitionend", onEnd);
    });
  }, selector);
};
