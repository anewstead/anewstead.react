import "slick-carousel/slick/slick.css";

import { IconButton, useTheme } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import Slider, { Settings as SlickSettings } from "react-slick";

import useStyles from "./carousel.style";

type IPrevNextButton = {
  direction: string;
  onClick?: () => unknown;
};

const PrevNextButton: React.FC<IPrevNextButton> = (props) => {
  const { direction, onClick } = props;
  const classes = useStyles();
  return (
    <div
      className={`${classes.prevNextButton} ${
        direction === "prev" ? classes.prevButton : classes.nextButton
      }`}
      onClick={onClick}
    >
      <div />
      <IconButton aria-label={`${direction}`}>
        <ArrowBackIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

type ICarousel = {
  slides: Array<JSX.Element>;
  settings?: SlickSettings;
};

const Carousel: React.FC<ICarousel> = (props) => {
  const { slides, settings } = props;
  const theme = useTheme();
  const classes = useStyles();

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
    <div className={classes.root} style={{ marginBottom: bmargin }}>
      <Slider {...config} className={classes.slider}>
        {slides}
      </Slider>
    </div>
  );
};

export default Carousel;
