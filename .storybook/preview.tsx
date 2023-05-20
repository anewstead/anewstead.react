import React from "react";
import { initialize as mswInitialize, mswDecorator } from "msw-storybook-addon";

import customViewports from "./customViewports";
import handlers from "../test-utils/msw/handlers";
import { AutoDocsTemplate } from "./AutoDocsTemplate";
import { ThemeDocsContainer, ThemeWrapper } from "./theme";
import { initThemeName } from "../src/wrappers/theme-wrapper/helpers";

// https://github.com/mswjs/msw-storybook-addon#configuring-msw
mswInitialize({
  onUnhandledRequest: "bypass",
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
    current: initThemeName(),
    stylePreview: true,
  },
  docs: {
    container: ({ children, context }) => {
      return (
        <ThemeDocsContainer context={context}>{children}</ThemeDocsContainer>
      );
    },
    page: () => {
      return <AutoDocsTemplate />;
    },
  },
  msw: { handlers },
  viewport: { viewports: customViewports },
};

export const decorators = [
  (Story, context) => {
    if (!context.parameters.removeGlobalThemeDecorator) {
      return <ThemeWrapper>{Story(context)}</ThemeWrapper>;
    }
    return <>{Story(context)}</>;
  },
  mswDecorator,
];
