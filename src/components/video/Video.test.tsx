import React from "react";
import { render } from "@testing-library/react";

import Video from "./Video";
import { BASE_CONTENT_URL, BASE_VIDEO_URL } from "../../core/const";

const videoURL = `${BASE_VIDEO_URL}1GMvNvQmYZI1AM8GRXR452LFvsebsz0JC`;
const posterURL = `${BASE_CONTENT_URL}img/poster/seat_leon.jpg`;

test("renders TextBlock with good HMTL", async () => {
  const { baseElement } = render(
    <Video videoURL={videoURL} posterURL={posterURL} />
  );
  // eslint-disable-next-line testing-library/no-node-access
  const video = baseElement.querySelector("video");
  expect(video).toBeInTheDocument();
});
