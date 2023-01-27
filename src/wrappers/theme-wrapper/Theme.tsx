import React from "react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import type { ReactNode } from "react";

import theme from "./theme.style";
import type { IThemeName } from "./theme.style";

type Props = {
  children: ReactNode;
  themeName: IThemeName;
};

const Theme = ({ children, themeName }: Props) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme[themeName]}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default Theme;
