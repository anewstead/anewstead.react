import React from "react";

import { initialize as mswInitialize, mswLoader } from "msw-storybook-addon";

import { retrieveThemeName } from "../src/wrappers/theme-wrapper/helpers";
import { handlers } from "../testing/msw/handlers";

import { AutoDocsTemplate } from "./AutoDocsTemplate";
import { customViewports } from "./customViewports";
import { ThemeDocsContainer, ThemeWrapper } from "./theme";

import type { DocsContextProps } from "@storybook/blocks";
import type { Preview } from "@storybook/react";

// https://github.com/mswjs/msw-storybook-addon#configuring-msw
mswInitialize({
  onUnhandledRequest: "bypass",
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    darkMode: {
      current: retrieveThemeName(),
      stylePreview: true,
    },
    docs: {
      container: ({
        children,
        context,
      }: {
        children: React.ReactNode;
        context: DocsContextProps;
      }) => {
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
  },

  decorators: [
    (Story, context) => {
      if (!context.parameters.removeGlobalThemeDecorator) {
        return <ThemeWrapper>{Story(context)}</ThemeWrapper>;
      }
      return <>{Story(context)}</>;
    },
  ],

  loaders: [mswLoader],
};

// eslint-disable-next-line import/no-default-export
export default preview;
