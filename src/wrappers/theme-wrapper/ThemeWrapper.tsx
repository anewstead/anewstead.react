// theme toggle based on:
// https://mui.com/material-ui/customization/dark-mode/#toggling-color-mode

import React, { useMemo, useState } from "react";
import type { ReactNode } from "react";

import ThemeBase from "./ThemeBase";
import { ThemeWrapperContext } from "./ThemeWrapperContext";
import { retrieveThemeName, toggleThemeName } from "./helpers";

type Props = {
  children: ReactNode;
};

const ThemeWrapper = ({ children }: Props) => {
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

export default ThemeWrapper;
