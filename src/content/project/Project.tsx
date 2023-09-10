import React from "react";

import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import Carousel from "../../components/carousel";
import InFrame from "../../components/in-frame";
import TextBlock from "../../components/text-block";
import Video from "../../components/video";
import PageLayout from "../../layout/page-layout";
import { useAppSelector } from "../../state/store";
import NoMatch from "../no-match/NoMatch";

import cls from "./project.module.scss";

import type { AppState } from "../../state/store";

const Project: React.FC = () => {
  const { uid } = useParams();

  const projectsData = useAppSelector((state: AppState) => {
    /* istanbul ignore next -- @preserve */
    return state.mainData.data?.projects || [];
  });

  const project = projectsData.find((obj) => {
    return obj.uid === uid;
  });

  if (!project) {
    return <NoMatch />;
  }

  const titleText = project.agency;

  const hyphen = project.brand && project.title ? " - " : "";
  const subtitleText = `${project.brand}${hyphen}${project.title}`;

  let content = <></>;

  switch (project.view.type) {
    case "gallery": {
      const slides = project.view.gallery.map((obj, i) => {
        const alt = `${project.brand} ${project.title} image ${i}`;
        return <img src={obj.url} alt={`${alt} ${i}`} key={obj.url} />;
      });
      content = <Carousel slides={slides} />;
      break;
    }

    case "video": {
      content = (
        <Video
          videoURL={project.view.video.url}
          posterURL={project.view.poster.url}
        />
      );
      break;
    }

    case "iframe": {
      const title = `${project.brand} ${project.title}`;
      const checkAdBlock = project.type === "advert";
      content = (
        <InFrame
          title={title}
          width={project.view.width}
          height={project.view.height}
          iframeURL={project.view.url}
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
        style={{ maxWidth: project.view.width }}
        data-testid="project-page"
      >
        {content}
        <TextBlock htmlText={project.info.html} />
      </Container>
    </PageLayout>
  );
};

export default Project;
