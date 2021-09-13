import { Paper } from "@material-ui/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { detectAnyAdblocker } from "just-detect-adblock";
// end eslint-disable
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { IMainData, IRootState } from "../../app/store/types";
import TextBlock from "../../components/text-block";
import useStyles from "./InFrame.style";

type IInFrame = {
  data: IMainData;
};
const InFrame: React.FC<IInFrame> = (props) => {
  const { data } = props;

  const classes = useStyles();

  const baseContentURL = useSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

  const iframeURL = `${baseContentURL}${data.view.href}`;
  const stillURL = `${baseContentURL}${data.view.still}`;
  const alt = `${data.brand} ${data.project}`;

  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    detectAnyAdblocker().then((detected: boolean) => {
      setAdBlocked(detected);
    });
  }, []);

  const adBlockMsg =
    "Ad Blocker Detected, you will need to pause it to view full content";

  const iframe = (
    <iframe
      title={alt}
      src={iframeURL}
      width={data.view.width}
      height={data.view.height}
      className={classes.iframe}
    />
  );

  const failover = (
    <>
      <TextBlock htmlText={adBlockMsg} />
      <Paper className={classes.still}>
        <img src={stillURL} alt={alt} />
      </Paper>
    </>
  );

  const content = data.type === "banner" && adBlocked ? failover : iframe;

  return <>{content}</>;
};

export default InFrame;
