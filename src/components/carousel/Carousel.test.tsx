/* eslint-disable testing-library/no-node-access */
import React from "react";
import userEvent from "@testing-library/user-event";
import type { Settings as SlickSettings } from "react-slick";
import { render, screen } from "@testing-library/react";

import Carousel from "./Carousel";
import { BASE_CONTENT_URL } from "../../app/const";

const base = `${BASE_CONTENT_URL}img/gallery`;

const data = [
  { url: `${base}/themacallan_01.jpg`, alt: "mac1" },
  { url: `${base}/themacallan_02.jpg`, alt: "mac2" },
  { url: `${base}/themacallan_03.jpg`, alt: "mac3" },
];

const gallery = data.map((item) => {
  return <img src={item.url} alt={item.alt} key={item.alt} />;
});

test("renders Carousel", async () => {
  const settings: SlickSettings = { lazyLoad: undefined }; // no lazyload else only first exists
  render(<Carousel slides={gallery} settings={settings} />);
  const carousel = screen.getByTestId("carousel");
  expect(carousel).toBeInTheDocument();
  const images = carousel.querySelectorAll(".slick-slide:not(.slick-cloned)");
  expect(images).toHaveLength(gallery.length);
});

test("renders Carousel without dots", async () => {
  const settings: SlickSettings = { dots: false };
  render(<Carousel slides={gallery} settings={settings} />);
  const carousel = screen.getByTestId("carousel");
  expect(carousel).toBeInTheDocument();
});

test("handles prev and next", async () => {
  const user = userEvent.setup();
  const settings: SlickSettings = { speed: 0 }; // speed must be 0 to remove animation

  render(<Carousel slides={gallery} settings={settings} />);
  const carousel = await screen.findByTestId("carousel");
  expect(carousel).toBeInTheDocument();

  const buttons = screen.getAllByRole("button").filter((btn) => {
    return btn.hasAttribute("aria-label");
  });
  const prev = buttons.find((btn) => {
    return btn.getAttribute("aria-label") === "prev";
  });
  const next = buttons.find((btn) => {
    return btn.getAttribute("aria-label") === "next";
  });
  expect(prev).toBeInTheDocument();
  expect(next).toBeInTheDocument();

  const current1 = carousel.querySelector(".slick-current");
  expect(current1).toBeInTheDocument();

  await user.click(next!);
  const current2 = carousel.querySelector(".slick-current");
  expect(current2).toBeInTheDocument();
  expect(current2).not.toEqual(current1);

  await user.click(prev!);
  const current3 = carousel.querySelector(".slick-current");
  expect(current3).toBeInTheDocument();
  expect(current3).toEqual(current1);
});
