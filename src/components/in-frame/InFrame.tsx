import React from "react";
import { Paper } from "@mui/material";

import TextBlock from "../text-block";
import cls from "./inFrame.module.scss";
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

  const { adblockCheckComplete, adBlockDetected } = useDetectAdBlock();

  if (!adblockCheckComplete) {
    return <></>;
  }

  if (!adBlockDetected || !checkAdBlock) {
    return (
      <iframe
        title={title}
        src={iframeURL}
        width={width}
        height={height}
        className={cls.iframe}
        data-testid="inframe-iframe"
      />
    );
  }

  const adBlockMsg = `Ad Blocker Detected, you will need to pause it to view full content`;

  return (
    <div data-testid="inframe-failover">
      <TextBlock htmlText={adBlockMsg} />
      <Paper className={cls.still}>
        <img src={failOverImageURL} alt={title} />
      </Paper>
    </div>
  );
};

export default InFrame;
