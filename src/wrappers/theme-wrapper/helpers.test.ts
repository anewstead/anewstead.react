import { DEFAULT_THEME } from "./theme";
import { createMatchMedia } from "../../../test-utils/jestWindowExtended";
import { retrieveThemeName, storeThemeName, toggleThemeName } from "./helpers";

test("should init the theme, save to localStorage and toggle", async () => {
  const theme = retrieveThemeName();
  // will always DEFAULT because test browser cannot set prefers-color-scheme
  expect(theme).toEqual(DEFAULT_THEME);
  expect(retrieveThemeName()).toStrictEqual(theme);

  const toggleTheme = toggleThemeName();
  expect(toggleTheme).not.toEqual(DEFAULT_THEME);
  expect(retrieveThemeName()).toStrictEqual(toggleTheme);

  const unToggleTheme = toggleThemeName();
  expect(unToggleTheme).toEqual(DEFAULT_THEME);
  expect(retrieveThemeName()).toStrictEqual(theme);
});

test("init uses previous localstorage value", async () => {
  storeThemeName("dark");
  const theme = retrieveThemeName();
  expect(theme).toEqual("dark");
});

// note. jest 28+ should allow to use @jest-environment node
// instead of having to delete and put back window object
test("works when window is undefined (SSR)", async () => {
  const w = global.window;
  // @ts-ignore: 2790
  delete global.window;
  const theme = retrieveThemeName();
  expect(theme).toEqual(DEFAULT_THEME);
  global.window = w; // put it back so any afterEach() doesnt fail
});

test("returns dark if user preferred", async () => {
  window.matchMedia = createMatchMedia({ "prefers-color-scheme": "dark" });
  const theme = retrieveThemeName();
  expect(theme).toEqual("dark");
});
