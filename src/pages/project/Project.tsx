import React from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import Carousel from "../../components/carousel";
import InFrame from "../../components/in-frame";
import NoMatch from "../no-match/NoMatch";
import PageLayout from "../../containers/page-layout";
import TextBlock from "../../components/text-block";
import Video from "../../components/video";
import useStyles from "./Project.style";
import { IRootState } from "../../app/store/types";
import { useAppSelector } from "../../app/store";

const Project: React.FC = () => {
  const { id } = useParams();

  // const data: IMainData = params.data;

  const { classes } = useStyles();

  const baseContentURL = useAppSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

  const mainData = useAppSelector((state: IRootState) => {
    return state.app.mainData;
  });

  const data = mainData.find((obj) => {
    return Number(obj.id) === Number(id);
  });

  if (!data) {
    return <NoMatch />;
  }

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
      const { width } = data.view;
      const { height } = data.view;
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
      return <NoMatch />;
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
