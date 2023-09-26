import React from "react";

import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import Carousel from "../../components/carousel";
import InFrame from "../../components/in-frame";
import TextBlock from "../../components/text-block";
import Video from "../../components/video";
import PageLayout from "../../layout/page-layout";
import { ProjectType } from "../../services/hygraph/generated/graphql";
import { useAppSelector } from "../../state/store";
import NoMatch from "../no-match/NoMatch";

import cls from "./project.module.scss";

import type {
  GalleryView,
  IframeView,
  VideoView,
} from "../../services/hygraph/generated/graphql";
import type { AppState } from "../../state/store";

const Project: React.FC = () => {
  const { uid } = useParams();

  const projectsData = useAppSelector((state: AppState) => {
    /* istanbul ignore next -- @preserve */
    return state.mainData.data!.projects;
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

  switch (project.view!.type) {
    case "gallery": {
      const galleryView = project.view! as GalleryView;
      const slides = galleryView.gallery.map((obj, i) => {
        const alt = `${project.brand} ${project.title} image ${i}`;
        return <img src={obj.url} alt={`${alt} ${i}`} key={obj.url} />;
      });
      content = <Carousel slides={slides} />;
      break;
    }

    case "video": {
      const videoView = project.view! as VideoView;
      content = (
        <Video
          videoURL={videoView.video.url}
          posterURL={videoView.poster.url}
        />
      );
      break;
    }

    case "iframe": {
      const iframeView = project.view! as IframeView;
      const title = `${project.brand} ${project.title}`;
      const checkAdBlock = project.type === ProjectType.Advert;
      content = (
        <InFrame
          title={title}
          width={iframeView.width}
          height={iframeView.height}
          iframeURL={iframeView.url}
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
        style={{ maxWidth: project.view!.width }}
        data-testid="project-page"
      >
        {content}
        <TextBlock htmlText={project.info.html} />
      </Container>
    </PageLayout>
  );
};

export default Project;
