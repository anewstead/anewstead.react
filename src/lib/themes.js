import { blueGrey, grey } from "@material-ui/core/colors";
import {
  Theme,
  createTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

// remember preference for next time user visits
const storeColorTheme = (themeName: string) => {
  localStorage.setItem("theme", themeName);
};

// if user has been here before return their pref
// else try detect from browser preference
export const detectColorTheme = (): string => {
  const lsTheme = localStorage.getItem("theme");
  if (lsTheme && (lsTheme === "light" || lsTheme === "dark")) {
    return lsTheme;
  }
  let themeName = "light";
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    themeName = "dark";
  }
  storeColorTheme(themeName);
  return themeName;
};

export const toggleColorTheme = (): string => {
  const lsTheme = localStorage.getItem("theme");
  const themeName = lsTheme === "dark" ? "light" : "dark";
  storeColorTheme(themeName);
  return themeName;
};

const globalOverrides = (theme: Theme) => {
  return {
    MuiCssBaseline: {
      "@global": {
        html: {
          height: "100%",
          fontSmoothing: "auto",
          fontSize: 16,
          [theme.breakpoints.up("sm")]: {
            fontSize: 18,
          },
        },
        body: {
          height: "100%",
        },
        "#root": {
          height: "100%",
        },
        img: {
          display: "block",
        },
        a: {
          color: "inherit",
        },
      },
    },
  };
};

type IThemes = Record<string, Theme> & {
  light: Theme;
  dark: Theme;
};

const themes: IThemes = {
  light: responsiveFontSizes(
    createTheme({
      palette: {
        type: "light",
        background: {
          paper: blueGrey[50],
          default: grey[300],
        },
      },
    }),
    { breakpoints: ["xs", "sm"] }
  ),
  dark: responsiveFontSizes(
    createTheme({
      palette: {
        type: "dark",
        background: {
          paper: blueGrey[800],
          default: grey[800],
        },
      },
    }),
    { breakpoints: ["xs", "sm"], factor: 2 }
  ),
};

themes.light.overrides = globalOverrides(themes.light);
themes.dark.overrides = globalOverrides(themes.dark);

export default themes;
