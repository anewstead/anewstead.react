import { DEFAULT_THEME } from "@/style/theme";

import type { IThemeName } from "@/style/theme";

const LS_KEY_THEME = "dc-theme";

export const storeThemeName = (themeName: IThemeName) => {
  localStorage.setItem(LS_KEY_THEME, themeName);
};

export const retrieveThemeName = (): IThemeName => {
  // SSR
  if (typeof window === "undefined") {
    return DEFAULT_THEME;
  }
  // returning user
  let themeName = localStorage.getItem(LS_KEY_THEME) as IThemeName;
  if (themeName) {
    return themeName;
  }
  // first visit
  themeName = DEFAULT_THEME;
  // if default is light matchmedia checks if user prefers dark
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    themeName = "dark";
  }
  storeThemeName(themeName);
  return themeName;
};

export const toggleThemeName = (): IThemeName => {
  const currentTheme = retrieveThemeName();
  const newTheme: IThemeName = currentTheme === "light" ? "dark" : "light";
  storeThemeName(newTheme);
  return newTheme;
};
