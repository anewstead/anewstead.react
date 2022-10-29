export const waitForTransitionEnd = async (selector: string) => {
  await page.evaluate((sel) => {
    const transition = document.querySelector(sel);
    return new Promise<void>((resolve) => {
      const onEnd = () => {
        transition.removeEventListener("transitionend", onEnd);
        resolve();
      };
      transition.addEventListener("transitionend", onEnd);
    });
  }, selector);
};
