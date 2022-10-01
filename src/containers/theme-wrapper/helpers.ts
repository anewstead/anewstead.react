import type { IThemeName } from "./theme.style";

export const DEFAULT_THEME: IThemeName = "light";

const LS_KEY_THEME = "theme";

export const storeThemeName = (themeName: IThemeName) => {
  localStorage.setItem(LS_KEY_THEME, themeName);
};

export const retreiveThemeName = (): IThemeName | null => {
  return localStorage.getItem(LS_KEY_THEME) as IThemeName;
};

export const initThemeName = (): IThemeName => {
  if (typeof window === "undefined") {
    return DEFAULT_THEME; // SSR
  }
  const lsTheme = retreiveThemeName();
  if (lsTheme) {
    return lsTheme; // returning user
  }
  let themeName: IThemeName = DEFAULT_THEME;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    themeName = "dark"; // firsttime user system pref is dark
  }
  storeThemeName(themeName);
  return themeName;
};

export const toggleThemeName = (currentTheme: IThemeName): IThemeName => {
  const newTheme: IThemeName = currentTheme === "light" ? "dark" : "light";
  storeThemeName(newTheme);
  return newTheme;
};
