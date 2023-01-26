import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { Settings as SlickSettings } from "react-slick";

import Carousel from "./Carousel";
import { BASE_CONTENT_URL } from "../../core/const";

type Story = StoryObj<typeof Carousel>;
const meta: Meta<typeof Carousel> = {
  component: Carousel,
};
export default meta;

const base = `${BASE_CONTENT_URL}img/gallery`;

const data = [
  { url: `${base}/gx_01.jpg`, alt: "mac1" },
  { url: `${base}/gx_02.jpg`, alt: "mac2" },
  { url: `${base}/gx_03.jpg`, alt: "mac3" },
];

const gallery = data.map((item) => {
  return <img src={item.url} alt={item.alt} key={item.alt} />;
});

const settings: SlickSettings = { speed: 250, dots: true };

export const Default: Story = {
  args: {
    slides: gallery,
    settings,
  },
};
