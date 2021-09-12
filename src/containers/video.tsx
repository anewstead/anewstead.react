import { Container, Paper, Typography } from "@material-ui/core";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import React from "react";
import { useSelector } from "react-redux";

import { IRootState } from "../lib/store";
import { IMainData } from "../lib/store.types";
import useStyles from "./video.style";

type IVideo = {
  data: IMainData;
};

const Video: React.FC<IVideo> = (props) => {
  const { data } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

  const videoURL = `//drive.google.com/uc?export=download&id=${data.view.href}`;
  const posterURL = `${baseContentURL}img/poster/${data.view.poster}`;

  // safelySetInnerHTML :)
  const info = parse(DOMPurify.sanitize(data.info));

  return (
    <Container className={classes.root} style={{ maxWidth: data.view.width }}>
      <video
        className={classes.reactPlayer}
        width="100%"
        height="auto"
        poster={posterURL}
        controls
        preload="none"
        controlsList="nodownload"
        disablePictureInPicture
      >
        <source src={videoURL} type="video/mp4" />
      </video>
      <Paper className={classes.info}>
        <Typography
          variant="body2"
          gutterBottom
          component="div"
          align="justify"
        >
          {info}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Video;
