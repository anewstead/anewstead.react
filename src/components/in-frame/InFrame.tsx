import React from "react";

import { useDetectAdBlock } from "../../hooks/useDetectAdBlock";
import { TextBlock } from "../text-block";

import cls from "./inFrame.module.scss";

type Props = {
  title: string;
  width: number | string;
  height: number | string;
  iframeURL: string;

  checkAdBlock: boolean;
};

export const InFrame = (props: Props) => {
  const { title, width, height, iframeURL, checkAdBlock } = props;

  const { adblockCheckComplete, adBlockDetected } = useDetectAdBlock();

  // dont display anything until test is run
  if (!adblockCheckComplete) {
    return <></>;
  }

  const adBlockMsg =
    !checkAdBlock || !adBlockDetected ? (
      <></>
    ) : (
      <div data-testid="inframe-failover">
        <TextBlock htmlText="Ad Blocker Detected, you may need to pause it to view full content" />
      </div>
    );

  return (
    <>
      {adBlockMsg}
      <iframe
        title={title}
        src={iframeURL}
        width={width}
        height={height}
        className={cls.iframe}
        data-testid="inframe-iframe"
      />
    </>
  );
};
