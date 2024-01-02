// theme toggle based on:
// https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode

import React, { useMemo, useState } from "react";

import { retrieveThemeName, toggleThemeName } from "./helpers";
import { ThemeBase } from "./ThemeBase";
import { ThemeWrapperContext } from "./ThemeWrapperContext";

import type { ReactNode } from "react";

export type ThemeWrapperProps = {
  children: ReactNode;
};

export const ThemeWrapper = ({ children }: ThemeWrapperProps) => {
  const [themeName, setThemeName] = useState(retrieveThemeName());

  const toggleThemeMemo = useMemo(() => {
    return {
      toggleTheme: () => {
        setThemeName(toggleThemeName());
      },
    };
  }, []);

  return (
    <ThemeWrapperContext.Provider value={toggleThemeMemo}>
      <ThemeBase themeName={themeName}>{children}</ThemeBase>
    </ThemeWrapperContext.Provider>
  );
};
