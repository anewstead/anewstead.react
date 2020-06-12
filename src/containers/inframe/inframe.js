import {
  Container,
  Paper,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import adBlocker from "just-detect-adblock";
import React from "react";
import Iframe from "react-iframe";
import { useSelector } from "react-redux";

import withLayout from "../app/withLayout";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(3),
    },
    info: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(3),
    },
    still: {
      marginBottom: theme.spacing(3),
    },
    iframe: {
      marginBottom: theme.spacing(3),
      border: "none",
      backgroundColor: theme.palette.background.paper,
    },
  };
});

const InFrame = (props) => {
  const { data } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const iframeURL = `${baseContentURL}${data.view.href}`;
  const stillURL = `${baseContentURL}${data.view.still}`;
  const alt = `${data.brand} ${data.project}`;

  const theme = useTheme();

  const isXS = useMediaQuery(theme.breakpoints.down("xs"), { noSsr: true });

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(data.info));

  let banner;
  if (adBlocker.isDetected()) {
    banner = (
      <>
        <Paper
          className={classes.info}
          style={{
            width: `${data.view.width}px`,
          }}
        >
          <Typography
            variant={isXS ? "body2" : "body1"}
            gutterBottom
            component="div"
          >
            Ad Blocker Detected, you will need to pause it to view full content
          </Typography>
        </Paper>
        <Paper
          style={{
            width: `${data.view.width}px`,
            height: `${data.view.height}px`,
          }}
          className={classes.still}
        >
          <img src={stillURL} alt={alt} />
        </Paper>
      </>
    );
  } else {
    banner = (
      <Iframe
        url={iframeURL}
        width={data.view.width}
        height={data.view.height}
        className={classes.iframe}
      />
    );
  }

  return (
    <Container className={classes.root} style={{ width: data.view.width }}>
      {/* BANNER */}
      {banner}
      <Paper
        className={classes.info}
        style={{
          width: `${data.view.width}px`,
        }}
      >
        <Typography
          variant={isXS ? "body2" : "body1"}
          gutterBottom
          component="div"
        >
          {/* INFO */}
          {info}
        </Typography>
      </Paper>
    </Container>
  );
};

export default withLayout(InFrame);
