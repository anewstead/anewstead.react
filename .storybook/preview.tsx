import React from "react";
import { initialize as mswInitialize, mswDecorator } from "msw-storybook-addon";

import customViewports from "./customViewports";
import handlers from "../test-utils/msw/handlers";
import { ThemeDocsContainer, ThemeWrapper } from "./theme";

// https://github.com/mswjs/msw-storybook-addon#configuring-msw
mswInitialize({
  onUnhandledRequest: "bypass",
  quiet: true,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
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
  msw: { handlers },
  viewport: { viewports: customViewports },
};

export const decorators = [
  (Story, context) => {
    return <ThemeWrapper>{Story(context)}</ThemeWrapper>;
  },
  mswDecorator,
];
