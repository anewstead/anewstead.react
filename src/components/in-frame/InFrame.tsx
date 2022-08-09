import { Paper } from "@mui/material";
import { detectAnyAdblocker } from "just-detect-adblock";
import React, { useEffect, useState } from "react";

import TextBlock from "../text-block";
import useStyles from "./InFrame.style";

type IInFrame = {
  title: string;
  width: number;
  height: number;
  iframeURL: string;
  failOverImageURL: string;
  checkAdBlock: boolean;
};

const InFrame: React.FC<IInFrame> = (props) => {
  const { title, width, height, iframeURL, failOverImageURL, checkAdBlock } =
    props;

  const { classes } = useStyles();

  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    detectAnyAdblocker().then((detected: boolean) => {
      if (checkAdBlock) {
        setAdBlocked(detected);
      }
    });
  }, [checkAdBlock]);

  const adBlockMsg =
    "Ad Blocker Detected, you will need to pause it to view full content";

  const iframe = (
    <iframe
      title={title}
      src={iframeURL}
      width={width}
      height={height}
      className={classes.iframe}
    />
  );

  const failover = (
    <>
      <TextBlock htmlText={adBlockMsg} />
      <Paper className={classes.still}>
        <img src={failOverImageURL} alt={title} />
      </Paper>
    </>
  );

  const content = checkAdBlock && adBlocked ? failover : iframe;

  return content;
};

export default InFrame;
