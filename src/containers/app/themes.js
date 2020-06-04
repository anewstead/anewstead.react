import { createMuiTheme } from "@material-ui/core/styles";

// remember preference for next time user visits
const storeColorTheme = (themeName) => {
  localStorage.setItem("theme", themeName);
};

// if user has been here before return their pref
// else try detect from browser preference
export const detectColorTheme = () => {
  const lsTheme = localStorage.getItem("theme");
  if (lsTheme && (lsTheme === "light" || lsTheme === "dark")) {
    return lsTheme;
  }
  let theme = "light";
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    theme = "dark";
  }
  storeColorTheme(theme);
  return theme;
};

export const toggleColorTheme = () => {
  const lsTheme = localStorage.getItem("theme");
  const theme = lsTheme === "dark" ? "light" : "dark";
  storeColorTheme(theme);
  return theme;
};

const themes = {
  light: createMuiTheme({
    palette: {
      type: "light",
    },
  }),
  dark: createMuiTheme({
    palette: {
      type: "dark",
    },
  }),
};

export default themes;
