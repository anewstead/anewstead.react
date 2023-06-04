import "slick-carousel/slick/slick.css";

import React from "react";
import Slider from "react-slick";
import { Box, useTheme } from "@mui/material";
import type { Settings as SlickSettings } from "react-slick";

import PrevNextButton from "./PrevNextButton";
import cls from "./carousel.module.scss";

type Props = {
  slides: JSX.Element[];
  settings?: SlickSettings;
};

const Carousel = (props: Props) => {
  const { slides, settings } = props;

  const theme = useTheme();

  const defaults: SlickSettings = {
    dots: true,
    lazyLoad: "progressive",
    adaptiveHeight: true,
    prevArrow: <PrevNextButton direction="prev" />,
    nextArrow: <PrevNextButton direction="next" />,
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

export default Carousel;
