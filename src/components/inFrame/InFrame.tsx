import React from "react";

import { TextBlock } from "@/components/textBlock";
import { useDetectAdBlock } from "@/hooks/useDetectAdBlock";

import css from "./inFrame.module.scss";

export type InFrameProps = {
  title: string;
  width: number | string;
  height: number | string;
  iframeURL: string;
  checkAdBlock: boolean;
};

export const InFrame = ({
  title,
  width,
  height,
  iframeURL,
  checkAdBlock,
}: InFrameProps) => {
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
        className={css.iframe}
        data-testid="inframe-iframe"
      />
    </>
  );
};
