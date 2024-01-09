import React from "react";

import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import { Carousel } from "@/components/carousel";
import { InFrame } from "@/components/in-frame";
import { TextBlock } from "@/components/text-block";
import { Video } from "@/components/video";
import { NoMatch } from "@/content/no-match/";
import { PageLayout } from "@/layout/page-layout";
import { ProjectType, ViewType } from "@/services/hygraph/generated/graphql";
import { useAppSelector } from "@/state/store";

import css from "./project.module.scss";

import type {
  GalleryView,
  IframeView,
  VideoView,
} from "@/services/hygraph/generated/graphql";
import type { AppState } from "@/state/store";

export const Project = () => {
  const { uid } = useParams();

  const projectsData = useAppSelector((state: AppState) => {
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
    case ViewType.Gallery: {
      const galleryView = project.view! as GalleryView;
      const slides = galleryView.gallery.map((obj, i) => {
        const alt = `${project.brand} ${project.title} image ${i}`;
        return <img src={obj.url} alt={`${alt} ${i}`} key={obj.url} />;
      });
      content = <Carousel slides={slides} />;
      break;
    }

    case ViewType.Video: {
      const videoView = project.view! as VideoView;
      content = (
        <Video
          videoURL={videoView.video.url}
          posterURL={videoView.poster.url}
        />
      );
      break;
    }

    case ViewType.Iframe: {
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
        className={css.project}
        style={{ maxWidth: project.view!.width }}
        data-testid="project-page"
      >
        {content}
        <TextBlock htmlText={project.info.html} />
      </Container>
    </PageLayout>
  );
};
