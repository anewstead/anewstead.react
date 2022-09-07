import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import React from "react";
import Slider, { Settings as SlickSettings } from "react-slick";
import { Box, Button, useTheme } from "@mui/material";

import useStyles from "./Carousel.style";

type IPrevNextButton = {
  direction: string;
  onClick?: () => void;
};

const PrevNextButton: React.FC<IPrevNextButton> = (props) => {
  const { direction, onClick } = props;
  const { classes } = useStyles();
  return (
    <Button
      className={`${classes.prevNextButton} ${
        direction === "prev" ? classes.prevButton : classes.nextButton
      }`}
      onClick={onClick}
      aria-label={`${direction}`}
    >
      <Box className="carousel-slidebutton-icon-wrapper">
        <ArrowBackIosNewRoundedIcon fontSize="large" />
      </Box>
    </Button>
  );
};

type ICarousel = {
  slides: JSX.Element[];
  settings?: SlickSettings;
};

const Carousel: React.FC<ICarousel> = (props) => {
  const { slides, settings } = props;
  const theme = useTheme();
  const { classes } = useStyles();

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
