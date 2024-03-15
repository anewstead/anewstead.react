/*
light and dark themes  
use the component theme from ./src as a storybook decorator in preview and docs pages  
sync component theme and storybook-dark-mode addon
*/

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { DocsContainer } from "@storybook/addon-docs";
import { addons } from "@storybook/preview-api";
import { themes as sbThemes } from "@storybook/theming";
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
} from "storybook-dark-mode";

import { theme as themeBaseStyles } from "@/style/theme";
import {
  retrieveThemeName,
  storeThemeName,
  toggleThemeName,
} from "@/wrappers/themeWrapper/helpers";
import { ThemeBase } from "@/wrappers/themeWrapper/ThemeBase";
import { ThemeWrapperContext } from "@/wrappers/themeWrapper/ThemeWrapperContext";

import type { DocsContainerProps } from "@storybook/addon-docs";
import type { PropsWithChildren } from "react";

const themeBGColor = {
  light: themeBaseStyles.colorSchemes.light.palette.background.default,
  dark: themeBaseStyles.colorSchemes.dark.palette.background.default,
};

const getBgColor = () => {
  return themeBGColor[retrieveThemeName()];
};

const channel = addons.getChannel();

/*
useCurrentTheme
utility to sync storybook-dark-mode to component theme
*/
const useCurrentTheme = () => {
  const [themeName, setThemeName] = useState(retrieveThemeName());
  const [bgColor, setBgColor] = useState(getBgColor());
  // call from component theme
  // channel.emit does not fire when running tests via storybook test-runner
  // which is fine as you wont be testing SB theme
  const toggleTheme = useCallback(() => {
    setThemeName(toggleThemeName);
    setBgColor(getBgColor());
    channel.emit(UPDATE_DARK_MODE_EVENT_NAME);
  }, []);
  // add/remove darkmode addon event listener
  useEffect(() => {
    // passed from SB theme
    // important! DARK_MODE_EVENT_NAME can fire multiple times when page changes,
    // therefore component theme must be set implicitly not toggled
    const onDarkModeEvent = (isDark: boolean) => {
      const sbTheme = isDark ? "dark" : "light";
      if (sbTheme !== themeName) {
        setThemeName(sbTheme);
        storeThemeName(sbTheme);
        setBgColor(getBgColor());
      }
    };
    channel.on(DARK_MODE_EVENT_NAME, onDarkModeEvent);
    return () => {
      return channel.removeListener(DARK_MODE_EVENT_NAME, onDarkModeEvent);
    };
  }, [themeName]);

  return { bgColor, themeName, toggleTheme };
};

/*
theme preview page decorator
*/
export const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { themeName, toggleTheme } = useCurrentTheme();
  const toggleThemeMemo = useMemo(() => {
    return {
      toggleTheme,
    };
  }, [toggleTheme]);
  return (
    <ThemeWrapperContext.Provider value={toggleThemeMemo}>
      <ThemeBase themeName={themeName}>{children}</ThemeBase>
    </ThemeWrapperContext.Provider>
  );
};

/*
theme docs pages decorator
*/
export const ThemeDocsContainer: React.FC<
  PropsWithChildren<DocsContainerProps>
> = ({ children, context }) => {
  const { themeName, bgColor } = useCurrentTheme();
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
