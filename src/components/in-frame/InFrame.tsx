import React from "react";
import { Paper } from "@mui/material";

import TextBlock from "../text-block";
import useStyles from "./inFrame.style";
import { useDetectAdBlock } from "../../hooks/useDetectAdBlock";

type Props = {
  title: string;
  width: number | string;
  height: number | string;
  iframeURL: string;
  failOverImageURL: string;
  checkAdBlock: boolean;
};

const InFrame = (props: Props) => {
  const { title, width, height, iframeURL, failOverImageURL, checkAdBlock } =
    props;

  const { classes } = useStyles();

  const { adblockChecked, adBlockDetected } = useDetectAdBlock();

  if (!adblockChecked) {
    return <></>;
  }

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

  if (!checkAdBlock) {
    return iframe;
  }

  const adBlockMsg = `Ad Blocker Detected, you will need to pause it to view full content`;

  const failover = (
    <div data-testid="inframe-failover">
      <TextBlock htmlText={adBlockMsg} />
      <Paper className={classes.still}>
        <img src={failOverImageURL} alt={title} />
      </Paper>
    </div>
  );

  return adBlockDetected ? failover : iframe;
};

export default InFrame;
