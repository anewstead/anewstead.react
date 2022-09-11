/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";

import useStyles from "./video.style";

type Props = {
  videoURL: string;
  posterURL: string;
};

const Video = (props: Props) => {
  const { videoURL, posterURL } = props;

  const { classes } = useStyles();

  return (
    <>
      <video
        className={classes.root}
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
    </>
  );
};

export default Video;
