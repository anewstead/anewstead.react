/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from "react";
import { DocsContainer } from "@storybook/addon-docs";
import { themes } from "@storybook/theming";

import Theme from "../src/wrappers/theme-wrapper/Theme";

// get theme from dark mode toggle
// https://storybook.js.org/addons/storybook-dark-mode/
const getThemeName = () => {
  return (
    JSON.parse(localStorage.getItem("sb-addon-themes-3")).current || "light"
  );
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
const ThemeWrapper = ({ children }) => {
  const { themeName } = useTheme();
  return <Theme themeName={themeName}>{children}</Theme>;
};

// theme docs pages
const ThemeDocsContainer = ({ children, context }) => {
  const { themeName, bgColor } = useTheme();
  // correct bg in each component iframe
  useEffect(() => {
    const elems = document.querySelectorAll(".docs-story");
    elems.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.style.backgroundColor = bgColor;
    });
  }, [bgColor]);
  return (
    <DocsContainer context={context} theme={themes[themeName]}>
      {children}
    </DocsContainer>
  );
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // layout: "fullscreen",
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    stylePreview: true,
  },

  docs: {
    container: ({ children, context }) => {
      return (
        <ThemeDocsContainer context={context}>{children}</ThemeDocsContainer>
      );
    },
  },
};

export const decorators = [
  (Story, context) => {
    return <ThemeWrapper>{Story(context)}</ThemeWrapper>;
  },
];
