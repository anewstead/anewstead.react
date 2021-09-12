import React from "react";
import { RouteComponentProps } from "react-router-dom";

import Gallery from "../containers/Gallery";
import InFrame from "../containers/InFrame";
import PageLayout from "../containers/PageLayout";
import Video from "../containers/Video";
import { IMainData } from "../lib/Store.types";
import NoMatch from "./NoMatch";

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
