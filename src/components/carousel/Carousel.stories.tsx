import React from "react";

import { within, userEvent, expect } from "@storybook/test";

import { waitForTransition } from "../../../test-utils/waitFor";

import { Carousel } from "./Carousel";

import type { Meta, StoryObj } from "@storybook/react";
import type { Settings as SlickSettings } from "react-slick";

// -----------------------------------------------------------------------------
const meta: Meta<typeof Carousel> = {
  component: Carousel,
};
export default meta;
type Story = StoryObj<typeof meta>;
// -----------------------------------------------------------------------------

const imageData = [
  {
    url: "https://media.graphassets.com/output=format:jpg/3xnDvAVbROkrwjRYKUQo",
    alt: "mac1",
  },
  {
    url: "https://media.graphassets.com/output=format:jpg/X8RUyEpRkeTWvLnNk7IA",
    alt: "mac2",
  },
  {
    url: "https://media.graphassets.com/output=format:jpg/fYpU6VYcQFyrJA2mHI54",
    alt: "mac3",
  },
];

const slideImages = imageData.map((item) => {
  return <img src={item.url} alt={item.alt} key={item.alt} />;
});

// -----------------------------------------------------------------------------

export const Default: Story = {
  args: {
    slides: slideImages,
    settings: {
      speed: 0,
      lazyLoad: undefined,
    } satisfies SlickSettings,
  },

  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const carousel = canvas.getByTestId("carousel");
    const slick = carousel.firstElementChild;
    const prev = canvas.getByLabelText("prev");
    const next = canvas.getByLabelText("next");

    await step("it initialized", async () => {
      await expect(slick).toHaveClass("slick-initialized");
    });

    await step("it has more than 1 image", async () => {
      const images = carousel.querySelectorAll(
        ".slick-slide:not(.slick-cloned)"
      );
      await expect(images).toHaveLength(args.slides.length);
    });

    await step("it handles prev and next", async () => {
      const track = carousel.querySelector(".slick-track");
      const current1 = carousel.querySelector(".slick-current");
      await userEvent.click(next);
      await waitForTransition(track!);
      const current2 = carousel.querySelector(".slick-current");
      await expect(current2).not.toEqual(current1);
      await userEvent.click(prev);
      await waitForTransition(track!);
      const current3 = carousel.querySelector(".slick-current");
      await expect(current3).toEqual(current1);
    });
  },
};

// -----------------------------------------------------------------------------

export const WithoutDotNavigation: Story = {
  args: {
    slides: slideImages,
    settings: {
      speed: 1500,
      dots: false,
    } satisfies SlickSettings,
  },
};
