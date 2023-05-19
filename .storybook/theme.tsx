import React, { useEffect, useMemo, useState } from "react";
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
} from "storybook-dark-mode";
import { DocsContainer } from "@storybook/addon-docs";
import { addons } from "@storybook/addons";
import { themes as sbThemes } from "@storybook/theming";

import Theme from "../src/wrappers/theme-wrapper/Theme";
import { ThemeWrapperContext } from "../src/wrappers/theme-wrapper/ThemeWrapperContext";
import {
  initThemeName,
  toggleThemeName,
} from "../src/wrappers/theme-wrapper/helpers";

/*
configure ./src theme for use as storybook decorator in preview and docs pages
sync ./src theme (dark|light) with storybook-dark-mode addon
so components (dark|light) matches storybook layout (dark|light) 
*/

const getBgColor = () => {
  return global.getComputedStyle(document.body).backgroundColor;
};

const channel = addons.getChannel();

// listens for storybook-dark-mode changeEvent
// stores (dark|light) in hook for use in components
const useCurrentTheme = () => {
  const [themeName, setThemeName] = useState(initThemeName());
  const [bgColor, setBgColor] = useState(getBgColor());
  useEffect(() => {
    const updateTheme = (isDark) => {
      setThemeName(toggleThemeName(isDark ? "light" : "dark"));
      // timeout to allow redraw before we grab bg colour value
      // not ideal but preferable to hard coding values
      setTimeout(() => {
        setBgColor(getBgColor());
      }, 100);
    };
    channel.on(DARK_MODE_EVENT_NAME, updateTheme);
    return () => {
      return channel.removeListener(DARK_MODE_EVENT_NAME, updateTheme);
    };
  }, []);
  return { themeName, bgColor };
};

// theme preview page decorator
export const ThemeWrapper = ({ children }) => {
  const { themeName } = useCurrentTheme();
  const toggleThemeMemo = useMemo(() => {
    return {
      toggleTheme: () => {
        channel.emit(UPDATE_DARK_MODE_EVENT_NAME);
      },
    };
  }, []);
  return (
    <ThemeWrapperContext.Provider value={toggleThemeMemo}>
      <Theme themeName={themeName}>{children}</Theme>
    </ThemeWrapperContext.Provider>
  );
};

// theme docs pages decorator
export const ThemeDocsContainer = ({ children, context }) => {
  const { themeName, bgColor } = useCurrentTheme();
  // correct bg in each component iframe
  useEffect(() => {
    const elems = document.querySelectorAll(".docs-story");
    elems.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      (el as HTMLElement).style.backgroundColor = bgColor;
    });
  }, [bgColor]);
  return (
    <DocsContainer context={context} theme={sbThemes[themeName]}>
      {children}
    </DocsContainer>
  );
};
