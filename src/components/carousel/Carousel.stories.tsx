import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import type { Settings as SlickSettings } from "react-slick";
import { expect } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";

import Carousel from "./Carousel";
import { BASE_CONTENT_URL } from "../../core/const";
import { waitForTransition } from "../../../test-utils/waitFor";

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

export const Default: Story = {
  args: {
    slides: gallery,
    settings: {
      speed: 0,
      lazyLoad: undefined,
    } satisfies SlickSettings,
  },

  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const carousel = await canvas.getByTestId("carousel");
    const slick = carousel.firstElementChild;
    const prev = canvas.getByLabelText("prev");
    const next = canvas.getByLabelText("next");

    await expect(slick).toHaveClass("slick-initialized");

    await step("it has more than 1 image", async () => {
      const images = carousel.querySelectorAll(
        ".slick-slide:not(.slick-cloned)"
      );
      expect(images).toHaveLength(args.slides.length);
    });

    await step("it handles prev and next", async () => {
      const track = carousel.querySelector(".slick-track");
      const current1 = carousel.querySelector(".slick-current");
      await userEvent.click(next!);
      await waitForTransition(track!);
      const current2 = carousel.querySelector(".slick-current");
      expect(current2).not.toEqual(current1);
      await userEvent.click(prev!);
      await waitForTransition(track!);
      const current3 = carousel.querySelector(".slick-current");
      expect(current3).toEqual(current1);
    });
  },
};

export const WithoutDotNavigation: Story = {
  args: {
    slides: gallery,
    settings: {
      speed: 1500,
      dots: false,
    } satisfies SlickSettings,
  },
};
