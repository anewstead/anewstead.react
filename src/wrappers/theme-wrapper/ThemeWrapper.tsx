// theme toggle based on:
// https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode

import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";

import Theme from "./Theme";
import { ThemeWrapperContext } from "./ThemeWrapperContext";
import { initThemeName, toggleThemeName } from "./helpers";

type Props = {
  children: ReactNode;
};

const ThemeWrapper = ({ children }: Props) => {
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
      <Theme themeName={themeName}>{children}</Theme>
    </ThemeWrapperContext.Provider>
  );
};

export default ThemeWrapper;
