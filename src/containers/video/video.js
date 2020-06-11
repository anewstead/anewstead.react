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
import React from "react";
import ReactPlayer from "react-player";
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
    },
    reactPlayer: {
      marginBottom: theme.spacing(3),
    },
  };
});

const Video = (props) => {
  const { data } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const videoURL = `//drive.google.com/uc?export=download&id=${data.view.href}`;
  const posterURL = `${baseContentURL}img/poster/${data.view.poster}`;

  const theme = useTheme();

  const isXS = useMediaQuery(theme.breakpoints.down("xs"), { noSsr: true });

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(data.info));

  return (
    <Container className={classes.root} style={{ maxWidth: data.view.width }}>
      <ReactPlayer
        className={classes.reactPlayer}
        url={videoURL}
        width="100%"
        height="auto"
        config={{
          file: {
            attributes: {
              poster: posterURL,
              controls: true,
              preload: "none",
              controlsList: "nodownload",
              disablePictureInPicture: true,
            },
          },
        }}
      />
      <Paper className={classes.info}>
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

export default withLayout(Video);
