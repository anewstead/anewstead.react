import {
  DEFAULT_THEME,
  initThemeName,
  retreiveThemeName,
  toggleThemeName,
} from "./helpers";

test("should init the theme, save to localStorage and toggle", async () => {
  const theme = initThemeName();
  expect(theme).toEqual(DEFAULT_THEME);
  const lstheme = retreiveThemeName();
  expect(lstheme).toStrictEqual(theme);
  const toggleTheme = toggleThemeName(theme);
  expect(toggleTheme).not.toEqual(DEFAULT_THEME);
  const lstheme2 = retreiveThemeName();
  expect(lstheme2).toStrictEqual(toggleTheme);
});
