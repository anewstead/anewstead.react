import React from "react";
import { RouteComponentProps } from "react-router-dom";

import Gallery from "../containers/gallery";
import InFrame from "../containers/in-frame";
import PageLayout from "../containers/page-layout";
import Video from "../containers/video";
import { IMainData } from "../lib/store.types";
import NoMatch from "./no-match";

type IProject = {
  projectData: IMainData;
  routeProps: RouteComponentProps;
};
const Project: React.FC<IProject> = (props) => {
  const { projectData, routeProps } = props;

  const titleText = projectData.client;

  let subtitleText = "";
  if (projectData.brand && projectData.project) {
    subtitleText = `${projectData.brand} - ${projectData.project}`;
  } else if (projectData.brand) {
    subtitleText = projectData.brand;
  } else if (projectData.project) {
    subtitleText = projectData.project;
  }

  let content = <></>;

  switch (projectData.view.type) {
    case "gallery":
      content = <Gallery data={projectData} />;
      break;

    case "video":
      content = <Video data={projectData} />;
      break;

    case "iframe":
      content = <InFrame data={projectData} />;
      break;

    default:
      return <NoMatch {...routeProps} />;
  }

  return (
    <PageLayout
      headerNavType="detail"
      headerNavTitle={titleText}
      headerNavSubtitle={subtitleText}
    >
      {content}
    </PageLayout>
  );
};

export default Project;
