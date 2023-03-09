/* eslint-disable import/no-extraneous-dependencies */
import React from "react";

import { ThemeDocsContainer, ThemeWrapper } from "./theme";

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
