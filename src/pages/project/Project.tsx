import { Container } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { IMainData, IRootState } from "../../app/store/types";
import Carousel from "../../components/carousel";
import InFrame from "../../components/in-frame";
import TextBlock from "../../components/text-block";
import Video from "../../components/video";
import PageLayout from "../../containers/page-layout";
import NoMatch from "../no-match/NoMatch";
import useStyles from "./Project.style";

type IProject = {
  data: IMainData;
  routeProps: RouteComponentProps;
};
const Project: React.FC<IProject> = (props) => {
  const { data, routeProps } = props;

  const { classes } = useStyles();

  const baseContentURL = useSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

  const titleText = data.client;

  let subtitleText = "";
  if (data.brand && data.project) {
    subtitleText = `${data.brand} - ${data.project}`;
  } else if (data.brand) {
    subtitleText = data.brand;
  } else if (data.project) {
    subtitleText = data.project;
  }

  let content = <></>;

  switch (data.view.type) {
    case "gallery": {
      const slides = data.view.stills.map((obj, i) => {
        const url = `${baseContentURL}img/gallery/${obj}`;
        const alt = `${data.brand} ${data.project} image ${i}`;
        return <img src={url} alt={`${alt} ${i}`} key={obj} />;
      });
      content = <Carousel slides={slides} />;
      break;
    }

    case "video": {
      const videoURL = `//drive.google.com/uc?export=download&id=${data.view.href}`;
      const posterURL = `${baseContentURL}img/poster/${data.view.poster}`;
      content = <Video videoURL={videoURL} posterURL={posterURL} />;
      break;
    }

    case "iframe": {
      const width = data.view.width;
      const height = data.view.height;
      const iframeURL = `${baseContentURL}${data.view.href}`;
      const failOverImageURL = `${baseContentURL}${data.view.still}`;
      const title = `${data.brand} ${data.project}`;
      const checkAdBlock = data.type === "banner";
      content = (
        <InFrame
          title={title}
          width={width}
          height={height}
          iframeURL={iframeURL}
          failOverImageURL={failOverImageURL}
          checkAdBlock={checkAdBlock}
        />
      );
      break;
    }

    default:
      return <NoMatch {...routeProps} />;
  }

  return (
    <PageLayout
      headerNavType="detail"
      headerNavTitle={titleText}
      headerNavSubtitle={subtitleText}
    >
      <Container className={classes.root} style={{ maxWidth: data.view.width }}>
        {content}
        <TextBlock htmlText={data.info} />
      </Container>
    </PageLayout>
  );
};

export default Project;
