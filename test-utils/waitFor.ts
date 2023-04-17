import type { Page } from "@playwright/test";

/**
 * usage:
 * await waitForTimeout(200);
 */
export const waitForTimeout = async (ms: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
};

/**
 * waits for css transitions to end.
 * init:
 * returns if transition is not setup within 250ms, e.g.
 * the browser might skip and go to end state without events (to keep display in time).
 * if you find not at expected end state then the transition didnt exist on the specified element.
 * onEnd:
 * onward state may still need to propergate after transition so return is delayed 100ms.
 * e.g. a button might not be clickable.
 * usage:
 * userEvent.click(btnElement);
 * await waitForTransition(animElement);
 */
export const waitForTransition = async (el: HTMLElement | Element) => {
  await new Promise<void>((resolve) => {
    const initTimeout = setTimeout(onEnd, 250);
    el.addEventListener("transitionrun", onRun);
    el.addEventListener("transitionend", onEnd);
    el.addEventListener("transitioncancel", onEnd);
    function onRun() {
      clearTimeout(initTimeout);
    }
    function onEnd() {
      el.removeEventListener("transitionrun", onRun);
      el.removeEventListener("transitionend", onEnd);
      el.removeEventListener("transitioncancel", onEnd);
      setTimeout(() => {
        resolve();
      }, 100);
    }
  });
};

/**
 * playwright version of waitForTransition()
 * usage:
 * page.click('.btnElement');
 * await waitForTransition(page, '.animElement');
 */
export const waitForTransitionPW = async (page: Page, selector: string) => {
  await page.evaluate(async (sel) => {
    const el = document.querySelector(sel);
    if (!el) {
      throw new Error(`no element found: ${sel}`);
    }
    await new Promise<void>((resolve) => {
      const initTimeout = setTimeout(onEnd, 250);
      el.addEventListener("transitionrun", onRun);
      el.addEventListener("transitionend", onEnd);
      el.addEventListener("transitioncancel", onEnd);
      function onRun() {
        clearTimeout(initTimeout);
      }
      function onEnd() {
        el?.removeEventListener("transitionrun", onRun);
        el?.removeEventListener("transitionend", onEnd);
        el?.removeEventListener("transitioncancel", onEnd);
        setTimeout(() => {
          resolve();
        }, 100);
      }
    });
  }, selector);
};
