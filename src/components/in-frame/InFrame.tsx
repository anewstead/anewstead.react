import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { detectAnyAdblocker } from "just-detect-adblock";

import TextBlock from "../text-block";
import useStyles from "./inFrame.style";

type Props = {
  title: string;
  width: number;
  height: number;
  iframeURL: string;
  failOverImageURL: string;
  checkAdBlock: boolean;
};

const InFrame = (props: Props) => {
  const { title, width, height, iframeURL, failOverImageURL, checkAdBlock } =
    props;

  const { classes } = useStyles();

  const [hasAdBlocker, setHasAdBloacker] = useState(false);
  const [adBlockedHasRun, setAdBlockedHasRun] = useState(false);

  useEffect(() => {
    if (checkAdBlock) {
      detectAnyAdblocker().then((detected: boolean) => {
        if (detected) {
          setHasAdBloacker(true);
        }
        setAdBlockedHasRun(true);
      });
    }
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
      data-testid="inframe-iframe"
    />
  );

  const failover = (
    <div data-testid="inframe-failover">
      <TextBlock htmlText={adBlockMsg} />
      <Paper className={classes.still}>
        <img src={failOverImageURL} alt={title} />
      </Paper>
    </div>
  );

  const unset = <div data-testid="inframe-unset" />;
  let content = unset;

  // ensure only override once
  if (checkAdBlock) {
    if (adBlockedHasRun) {
      content = hasAdBlocker ? failover : iframe;
    }
  } else {
    content = iframe;
  }

  return content;
};

export default InFrame;
