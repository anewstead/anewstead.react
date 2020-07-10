import React from "react";

import Gallery from "../containers/gallery";
import InFrame from "../containers/in-frame";
import PageLayout from "../containers/page-layout";
import Video from "../containers/video";
import NoMatch from "../pages/no-match";

const Project = (props) => {
  const { projectData } = props;

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
      // const msg = `"unknown page template type: ${projectData.view.type}"`;
      return <NoMatch {...props} />;
  }

  return (
    <PageLayout
      headerNavType="detail"
      headerNavTitle={titleText}
      headerNavSubtitle={subtitleText}
    >
      {/* CONTENT */}
      {content}
    </PageLayout>
  );
};

export default Project;
