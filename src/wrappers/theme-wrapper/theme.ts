import type {} from "@mui/material/themeCssVarsAugmentation";

import "./theme.scss";

import type { CssVarsTheme, Theme } from "@mui/material/styles";
import { blueGrey, grey } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// helper to make the mui type easier to use
export type IThemeStyles = Omit<Theme, "palette"> & CssVarsTheme;

export type IThemeName = "light" | "dark";

export const DEFAULT_THEME: IThemeName = "dark";

const theme = extendTheme({
  cssVarPrefix: "dc",
  colorSchemes: {
    light: {
      palette: {
        background: {
          paper: blueGrey[50],
          default: grey[300],
        },
      },
    },
    dark: {
      palette: {
        background: {
          paper: blueGrey[800],
          default: grey[800],
        },
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
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
  },
});

export default theme as IThemeStyles;
