import React from "react";
import Slider from "react-slick";
import { Box, useTheme } from "@mui/material";
import type { Settings as SlickSettings } from "react-slick";

import useStyles from "./carousel.style";
import PrevNextButton, { DIRECTION } from "./PrevNextButton";

type ICarousel = {
  slides: JSX.Element[];
  settings?: SlickSettings;
};

const Carousel = (props: ICarousel) => {
  const { slides, settings } = props;

  const theme = useTheme();
  const { classes } = useStyles();

  const defaults: SlickSettings = {
    dots: true,
    lazyLoad: "progressive",
    adaptiveHeight: true,
    prevArrow: <PrevNextButton direction={DIRECTION.PREV} />,
    nextArrow: <PrevNextButton direction={DIRECTION.NEXT} />,
  };

  const config: SlickSettings = {
    ...defaults,
    ...settings,
  };

  const bmargin = config.dots ? theme.spacing(6) : theme.spacing(4);

  return (
    <Box className={classes.root} style={{ marginBottom: bmargin }}>
      <Slider {...config} className={classes.slider}>
        {slides}
      </Slider>
    </Box>
  );
};

export default Carousel;
