import React from "react";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import Carousel from "../../components/carousel";
import InFrame from "../../components/in-frame";
import NoMatch from "../no-match/NoMatch";
import PageLayout from "../../layout/page-layout";
import TextBlock from "../../components/text-block";
import Video from "../../components/video";
import cls from "./project.module.scss";
import type { AppState } from "../../state/store";
import { BASE_CONTENT_URL, BASE_VIDEO_URL } from "../../const";
import { useAppSelector } from "../../state/store";

const Project: React.FC = () => {
  const { id } = useParams();

  const mainData = useAppSelector((state: AppState) => {
    return state.mainData.data;
  });

  const data = mainData.find((obj) => {
    return Number(obj.id) === Number(id);
  });

  if (!data) {
    return <NoMatch />;
  }

  const titleText = data.client;

  const hyphen = data.brand && data.project ? " - " : "";
  const subtitleText = `${data.brand}${hyphen}${data.project}`;

  let content = <></>;

  switch (data.view.type) {
    case "gallery": {
      const slides = data.view.stills.map((obj, i) => {
        const url = `${BASE_CONTENT_URL}img/gallery/${obj}`;
        const alt = `${data.brand} ${data.project} image ${i}`;
        return <img src={url} alt={`${alt} ${i}`} key={obj} />;
      });
      content = <Carousel slides={slides} />;
      break;
    }

    case "video": {
      const videoURL = `${BASE_VIDEO_URL}${data.view.href}`;
      const posterURL = `${BASE_CONTENT_URL}img/poster/${data.view.poster}`;
      content = <Video videoURL={videoURL} posterURL={posterURL} />;
      break;
    }

    case "iframe": {
      const { width } = data.view;
      const { height } = data.view;
      const iframeURL = `${BASE_CONTENT_URL}${data.view.href}`;
      const failOverImageURL = `${BASE_CONTENT_URL}${data.view.still}`;
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
      <Container
        className={cls.project}
        style={{ maxWidth: data.view.width }}
        data-testid="project-page"
      >
        {content}
        <TextBlock htmlText={data.info} />
      </Container>
    </PageLayout>
  );
};

export default Project;
