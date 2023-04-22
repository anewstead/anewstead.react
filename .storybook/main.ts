import path from "path";
import type { AddonOptionsVite } from "@storybook/addon-coverage";
import type { StorybookConfig } from "@storybook/react-vite";
import type { UserConfig } from "vite";
import { mergeConfig } from "vite";

const addonCoverage = {
  name: "@storybook/addon-coverage",
  options: {
    istanbul: {
      cwd: "./src",
      include: ["**/*.@(jsx|tsx)"],
    },
  } satisfies AddonOptionsVite,
};

const sbConfig: StorybookConfig = {
  async viteFinal(config) {
    return mergeConfig(config, {
      server: {
        watch: {
          // cannot set cwd to ./src as also need to watch public folder and others
          // specify what not to watch (.git and node_modules default ignored)
          // glob but must begin as absolute path or be fully recursive
          // path.resolve("./dist") = dist folder in project root
          // **/dist = all dist folders
          ignored: [
            "**/.nyc_output",
            path.resolve("./coverage"),
            path.resolve("./dist"),
            path.resolve("./build"),
            path.resolve("./storybook-static"),
          ],
        },
      },
    } satisfies UserConfig);
  },
  stories: ["../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    addonCoverage,
    "storybook-dark-mode-v7",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ["./static"],
};
export default sbConfig;