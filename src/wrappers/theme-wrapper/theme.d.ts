/*
https://mui.com/material-ui/experimental-api/css-variables/
"If you are using TypeScript you should use module augmentation to update the Theme structure:"
*/
import type { Theme as MuiTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    vars: Omit<
      MuiTheme,
      "typography" | "mixins" | "breakpoints" | "direction" | "transitions"
    >;
  }
}
