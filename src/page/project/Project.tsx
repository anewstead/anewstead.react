import React from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import AppLayout from "../../containers/app-layout";
import Carousel from "../../components/carousel";
import InFrame from "../../components/in-frame";
import NoMatch from "../no-match/NoMatch";
import TextBlock from "../../components/text-block";
import Video from "../../components/video";
import useStyles from "./project.style";
import { BASE_CONTENT_URL, BASE_VIDEO_URL } from "../../app/const";
import { NAV_TYPE } from "../../components/header-nav/HeaderNav";
import {
  PROJECT_TYPE,
  PROJECT_VIEW,
} from "../../app/state/slice/mainDataState";
import type { RootState } from "../../app/state/store";
import { useAppSelector } from "../../app/state/store";

const Project = () => {
  const { id } = useParams();

  const { classes } = useStyles();

  const mainData = useAppSelector((state: RootState) => {
    return state.mainData.data;
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
    case PROJECT_VIEW.GALLERY: {
      const slides = data.view.stills.map((obj, i) => {
        const url = `${BASE_CONTENT_URL}img/gallery/${obj}`;
        const alt = `${data.brand} ${data.project} image ${i}`;
        return <img src={url} alt={`${alt} ${i}`} key={obj} />;
      });
      content = <Carousel slides={slides} />;
      break;
    }

    case PROJECT_VIEW.VIDEO: {
      const videoURL = `${BASE_VIDEO_URL}${data.view.href}`;
      const posterURL = `${BASE_CONTENT_URL}img/poster/${data.view.poster}`;
      content = <Video videoURL={videoURL} posterURL={posterURL} />;
      break;
    }

    case PROJECT_VIEW.IFRAME: {
      const { width } = data.view;
      const { height } = data.view;
      const iframeURL = `${BASE_CONTENT_URL}${data.view.href}`;
      const failOverImageURL = `${BASE_CONTENT_URL}${data.view.still}`;
      const title = `${data.brand} ${data.project}`;
      const checkAdBlock = data.type === PROJECT_TYPE.BANNER;
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
    <AppLayout
      headerNavType={NAV_TYPE.DETAILS}
      headerNavTitle={titleText}
      headerNavSubtitle={subtitleText}
    >
      <Container className={classes.root} style={{ maxWidth: data.view.width }}>
        {content}
        <TextBlock htmlText={data.info} />
      </Container>
    </AppLayout>
  );
};

export default Project;
