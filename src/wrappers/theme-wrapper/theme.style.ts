import type { CssVarsTheme, Theme } from "@mui/material/styles";
import { blueGrey, grey } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

/*
in order to use responsive breakpoint at theme/global level 
first need to init a base theme to reference breakpoints from
its possible then to overwrite it referencing back its own breakpoints
*/

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};

let theme = extendTheme({
  breakpoints,
});
theme = extendTheme({
  breakpoints,
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
  },
});

// helper to make the mui type easier to use
export type IThemeStyles = Omit<Theme, "palette"> & CssVarsTheme;

export type IThemeName = "light" | "dark";

export const DEFAULT_THEME: IThemeName = "dark";

const styles: IThemeStyles = theme;
export default styles;
