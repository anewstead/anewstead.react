import type { IThemeName } from "./theme.style";

const LS_KEY_THEME = "theme";

export const storeThemeName = (themeName: IThemeName) => {
  localStorage.setItem(LS_KEY_THEME, themeName);
};

export const retreiveThemeName = (): IThemeName | null => {
  return localStorage.getItem(LS_KEY_THEME) as IThemeName;
};

// default dark
// no longer checks user matchMedia prefers-color-scheme
export const initThemeName = (): IThemeName => {
  if (typeof window === "undefined") {
    return "dark"; // SSR
  }
  const lsTheme = retreiveThemeName();
  if (lsTheme) {
    return lsTheme; // returning user
  }
  storeThemeName("dark");
  return "dark";
};

export const toggleThemeName = (currentTheme: IThemeName): IThemeName => {
  const newTheme: IThemeName = currentTheme === "light" ? "dark" : "light";
  storeThemeName(newTheme);
  return newTheme;
};
