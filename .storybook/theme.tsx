import React, { useEffect, useState } from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { themes } from "@storybook/theming";

import Theme from "../src/wrappers/theme-wrapper/Theme";
import type { IThemeName } from "../src/wrappers/theme-wrapper/theme.style";

// get theme from dark mode toggle
// https://storybook.js.org/addons/storybook-dark-mode/
const getThemeName = () => {
  const lsTheme = localStorage.getItem("sb-addon-themes-3");
  let theme = "light";
  if (lsTheme) {
    if (String(JSON.parse(lsTheme).current).toLowerCase() === "dark") {
      theme = "dark";
    }
  }
  return theme as IThemeName;
};

const getBgColor = () => {
  return global.getComputedStyle(document.body).backgroundColor;
};

const useTheme = () => {
  const [themeName, setThemeName] = useState(getThemeName());
  const [bgColor, setBgColor] = useState(getBgColor());
  useEffect(() => {
    const timer = setInterval(() => {
      setThemeName(getThemeName());
      setBgColor(getBgColor());
    }, 333);
    return () => {
      return clearInterval(timer);
    };
  }, []);
  return { themeName, bgColor };
};

// theme components
export const ThemeWrapper = ({ children }) => {
  const { themeName } = useTheme();
  return <Theme themeName={themeName}>{children}</Theme>;
};

// theme docs pages
export const ThemeDocsContainer = ({ children, context }) => {
  const { themeName, bgColor } = useTheme();
  // correct bg in each component iframe
  useEffect(() => {
    const elems = document.querySelectorAll(".docs-story");
    elems.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      (el as HTMLElement).style.backgroundColor = bgColor;
    });
  }, [bgColor]);
  return (
    <DocsContainer context={context} theme={themes[themeName]}>
      {children}
    </DocsContainer>
  );
};
