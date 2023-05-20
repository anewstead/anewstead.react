import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming/create";

const myTheme = create({
  base: "dark",
  brandTitle: "A.Newstead",
  brandUrl: "./",
  brandImage: "./logo64.png",
  brandTarget: "_self",
});

addons.setConfig({
  theme: myTheme,
});
