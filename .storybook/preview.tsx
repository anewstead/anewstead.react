import React from "react";
import { initialize as mswInitialize, mswDecorator } from "msw-storybook-addon";

import { ThemeDocsContainer, ThemeWrapper } from "./theme";
import { mswConfig } from "./msw";

// https://github.com/mswjs/msw-storybook-addon#configuring-msw
mswInitialize({
  onUnhandledRequest: "bypass",
  quiet: true,
});

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

  msw: mswConfig,
};

export const decorators = [
  (Story, context) => {
    return <ThemeWrapper>{Story(context)}</ThemeWrapper>;
  },
  mswDecorator,
];
