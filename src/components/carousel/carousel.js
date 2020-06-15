import "slick-carousel/slick/slick.css";

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
        position: "absolute",
        width: "100%",
        listStyle: "none",
        padding: "0",
        marginTop: theme.spacing(),
        marginBottom: theme.spacing(),
        textAlign: "center",
        "& li": {
          display: "inline-block",
        },
        "& button": {
          position: "relative",
          display: "block",
          backgroundColor: "transparent",
          border: "0",
          borderRadius: "10px",
          height: "20px",
          width: "20px",
          outline: "none",
          lineHeight: "0px",
          fontSize: "0px",
          color: "transparent",
          margin: "2px",
          "&:hover, &:focus": {
            outline: "none",
            backgroundColor: theme.palette.action.focus,
            "&:before": {
              opacity: "0.8",
            },
          },
          "&:before": {
            color: `${theme.palette.text.primary} `,
            content: '"•"',
            width: "20px",
            height: "20px",
            fontSize: "22px",
            lineHeight: "20px",
            opacity: "0.3",
            position: "absolute",
            top: "0",
            left: "0",
          },
        },
        "& .slick-active button:before": {
          opacity: "0.8",
        },
      },
      // slick js adds display:inline-block to each slide
      // which creates an unwanted margin at the bottom of the slide
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
      "&:hover, &:focus-within": {
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
