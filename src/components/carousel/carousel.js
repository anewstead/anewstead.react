import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IconButton, makeStyles, useTheme } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { isMobile } from "react-device-detect";
import Slider from "react-slick";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "relative",
      width: "100%",
    },
    slider: {
      backgroundColor: theme.palette.background.paper,
      position: "relative",
      width: "100%",
      marginBottom: theme.spacing(4),
      "& .slick-dots": {
        "& button:before": {
          color: `${theme.palette.text.primary} !important`,
        },
      },
      // slick adds display:inline-block to each slide
      // this creates an unwanted margin at the bottom of the slide
      // fix is to override with display: block !important
      "& .slick-slide": {
        "& > div > *": {
          display: "block !important",
        },
        "& img": {
          width: "100%", //make sure image scales to carousel width
        },
      },
    },
    prevNextButton: {
      position: "absolute",
      zIndex: "1",
      top: "0",
      height: "100%",
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
      opacity: "0",
      "&:hover": {
        opacity: `${isMobile ? "0" : "1"}`,
      },
      "& div:first-child": {
        position: "absolute",
        backgroundColor: theme.palette.background.default,
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
        opacity: "0.2",
      },
      "& .MuiIconButton-root": {
        top: "50%",
        transform: "translateY(-50%)",
        opacity: "0.8",
        backgroundColor: theme.palette.background.paper,
      },
    },
    prevButton: {
      left: "0",
    },
    nextButton: {
      right: "0",
      "& svg": {
        transform: "rotate(180deg)",
      },
    },
  };
});

const PrevNextButton = (props) => {
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

// slides = array of display items e.g. img div
const Carousel = (props) => {
  const { slides, settings } = props;
  const theme = useTheme();
  const classes = useStyles();

  const defaults = {
    dots: true,
    lazyLoad: "progressive",
    adaptiveHeight: true,
    prevArrow: <PrevNextButton direction="prev" />,
    nextArrow: <PrevNextButton direction="next" />,
    mobileFirst: true,
  };

  const config = {
    ...defaults,
    ...settings,
  };

  const bmargin = config.dots ? theme.spacing(6) : theme.spacing(4);

  return (
    <div className={classes.root} style={{ marginBottom: bmargin }}>
      <Slider {...config} className={classes.slider}>
        {/* SLIDES */}
        {slides}
      </Slider>
    </div>
  );
};

export default Carousel;
