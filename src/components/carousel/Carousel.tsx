import "slick-carousel/slick/slick.css";

import React from "react";

import { Box, useTheme } from "@mui/material";
import Slider from "react-slick";

import cls from "./carousel.module.scss";
import { CarouselButton } from "./CarouselButton";

import type { Settings as SlickSettings } from "react-slick";

export type CarouselProps = {
  slides: JSX.Element[];
  settings?: SlickSettings;
};

export const Carousel = ({ slides, settings }: CarouselProps) => {
  const theme = useTheme();

  const defaults: SlickSettings = {
    dots: true,
    lazyLoad: "progressive",
    adaptiveHeight: true,
    prevArrow: <CarouselButton direction="prev" />,
    nextArrow: <CarouselButton direction="next" />,
  };

  const config: SlickSettings = {
    ...defaults,
    ...settings,
  };

  const bmargin = config.dots ? theme.spacing(6) : theme.spacing(4);

  return (
    <Box
      className={cls.carousel}
      style={{ marginBottom: bmargin }}
      data-testid="carousel"
    >
      <Slider {...config} className={cls.slider}>
        {slides}
      </Slider>
    </Box>
  );
};
