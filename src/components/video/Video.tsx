/* eslint-disable jsx-a11y/media-has-caption */
import React from "react";

import cls from "./video.module.scss";

export type VideoProps = {
  videoURL: string;
  posterURL: string;
};

export const Video = ({ videoURL, posterURL }: VideoProps) => {
  return (
    <video
      className={cls.video}
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
  );
};
