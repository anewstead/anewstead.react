// theme toggle based on:
// https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode

import React, { useMemo, useState } from "react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import type { ReactNode } from "react";

import theme from "./theme.style";
import { ThemeWrapperContext } from "./ThemeWrapperContext";
import { initThemeName, toggleThemeName } from "./helpers";

type Props = {
  children: ReactNode;
};

const ThemeWrapper = (props: Props) => {
  const { children } = props;

  const [themeName, setThemeName] = useState(initThemeName());

  const toggleThemeMemo = useMemo(() => {
    return {
      toggleTheme: () => {
        setThemeName(toggleThemeName(themeName));
      },
    };
  }, [themeName]);

  return (
    <ThemeWrapperContext.Provider value={toggleThemeMemo}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme[themeName]}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </ThemeWrapperContext.Provider>
  );
};

export default ThemeWrapper;
