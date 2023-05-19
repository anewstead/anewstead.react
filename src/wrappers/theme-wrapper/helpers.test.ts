import {
  DEFAULT_THEME,
  initThemeName,
  retreiveThemeName,
  storeThemeName,
  toggleThemeName,
} from "./helpers";
import { createMatchMedia } from "../../../test-utils/jestWindowExtended";

test("should init the theme, save to localStorage and toggle", async () => {
  const theme = initThemeName();
  expect(theme).toEqual(DEFAULT_THEME);
  expect(retreiveThemeName()).toStrictEqual(theme);

  const toggleTheme = toggleThemeName(theme);
  expect(toggleTheme).not.toEqual(DEFAULT_THEME);
  expect(retreiveThemeName()).toStrictEqual(toggleTheme);

  const unToggleTheme = toggleThemeName(toggleTheme);
  expect(unToggleTheme).toEqual(DEFAULT_THEME);
  expect(retreiveThemeName()).toStrictEqual(theme);
});

test("init uses previous localstorage value", async () => {
  storeThemeName("dark");
  const theme = initThemeName();
  expect(theme).toEqual("dark");
});

// note. jest 28+ should allow to use @jest-environment node
// instead of having to delete and put back window object
// (CRA 5.0.1 uses jest 27)
test("works when window is undefined (SSR)", async () => {
  const w = global.window;
  // @ts-ignore: 2790
  delete global.window;
  const theme = initThemeName();
  expect(theme).toEqual(DEFAULT_THEME);
  global.window = w; // put it back so any afterEach() doesnt fail
});

test("returns dark if user preferred", async () => {
  window.matchMedia = createMatchMedia({ "prefers-color-scheme": "dark" });
  const theme = initThemeName();
  expect(theme).toEqual("dark");
});
