import React from "react";

import Theme from "../src/wrappers/theme-wrapper/Theme";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: "light",
    toolbar: {
      // icon: "circlehollow",
      title: "Theme",
      items: [
        { value: "light", title: "Component Theme Light" },
        { value: "dark", title: "Component Theme Dark" },
      ],

      dynamicTitle: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, context) => {
    return <Theme themeName={context.globals.theme}>{Story()}</Theme>;
  },
];
