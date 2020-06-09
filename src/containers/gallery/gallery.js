import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  Container,
  IconButton,
  Paper,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import parse from "html-react-parser";
import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";

import withLayout from "../app/withLayout";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(3),
    },
    slider: {
      // backgroundColor: theme.palette.background.paper,
      position: "relative",
      width: "100%",
      // maxWidth: see inline style
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: theme.spacing(6),
      "& .slick-dots": {
        "& button:before": {
          color: `${theme.palette.text.primary} !important`,
        },
      },
    },
    buttonBackNext: {
      position: "absolute",
      zIndex: "1",
      top: "0",
      height: "100%",
      padding: theme.spacing(2),
      color: theme.palette.text.primary,
      opacity: "0",
      "&:hover": {
        opacity: "1",
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
      "& > button": {
        top: "50%",
        transform: "translateY(-50%)",
        opacity: "0.8",
        backgroundColor: theme.palette.background.paper,
      },
    },
    buttonBack: {
      left: "0",
    },
    buttonNext: {
      right: "0",
      "& svg": {
        transform: "rotate(180deg)",
      },
    },
    info: {
      padding: theme.spacing(2),
    },
    img: {
      width: "100%",
    },
  };
});

const BackButton = (props) => {
  const { onClick, classes } = props;
  return (
    <div
      className={`${classes.buttonBackNext} ${classes.buttonBack}`}
      onClick={onClick}
    >
      <div />
      <IconButton aria-label="back">
        <ArrowBackIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

const NextButton = (props) => {
  const { onClick, classes } = props;
  return (
    <div
      className={`${classes.buttonBackNext} ${classes.buttonNext}`}
      onClick={onClick}
    >
      <div />
      <IconButton aria-label="back">
        <ArrowBackIcon fontSize="large" />
      </IconButton>
    </div>
  );
};

const Gallery = (props) => {
  const { data, subtitleText } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });
  const theme = useTheme();

  const isMobile = !useMediaQuery(theme.breakpoints.up("sm"));

  const slides = data.view.stills.map((obj, i) => {
    const url = `${baseContentURL}img/gallery/${obj}`;
    return (
      <div key={i}>
        <img src={url} alt={`${subtitleText} ${i}`} className={classes.img} />
      </div>
    );
  });

  const settings = {
    dots: true,
    adaptiveHeight: true,
    prevArrow: <BackButton classes={classes} />,
    nextArrow: <NextButton classes={classes} />,
    mobileFirst: true,
  };

  return (
    <Container className={classes.root} style={{ maxWidth: data.view.width }}>
      <Slider {...settings} className={classes.slider}>
        {/* SIDES */}
        {slides}
      </Slider>
      <Paper className={classes.info}>
        <Typography variant={isMobile ? "body2" : "body1"} gutterBottom>
          {parse(data.info)}
        </Typography>
      </Paper>
    </Container>
  );
};

export default withLayout(Gallery);
