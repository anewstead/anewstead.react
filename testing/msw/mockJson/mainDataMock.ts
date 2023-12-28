import {
  ProjectType,
  ViewType,
} from "../../../src/services/hygraph/generated/graphql";
import {
  aGalleryView,
  aGlobal,
  aPage,
  aProject,
  aVideoView,
  anAsset,
  anIframeView,
} from "../../../src/services/hygraph/generated/mockData";

import type {
  AllDataQuery,
  FprojectFragment,
} from "../../../src/services/hygraph/generated/graphql";

export const videoURL = "https://media.graphassets.com/lVCbqtaQqCpJkGFGwAfh";

export const posterURL =
  "https://media.graphassets.com/output=format:jpg/wCOOr73TwuCKcBLKAdSO";

export const thumbURL =
  "https://media.graphassets.com/output=format:jpg/2QaiukKTYiyuHz3rOIQy";

export const iFrameURL =
  "https://anewstead-content.netlify.app/sites/halifax/index.html";

export const imageURL =
  "https://media.graphassets.com/output=format:jpg/jPv3Z5BzTfC38RxrRefu";

export const imageURL2 =
  "https://media.graphassets.com/output=format:jpg/m7lIWY3qSkiAEZymSoig";

export const imageURL3 =
  "https://media.graphassets.com/output=format:jpg/I10td11KSBW0cpDoiUjs";

export const projectGalleryWebsite: FprojectFragment = aProject({
  uid: "gxlabs",
  type: ProjectType.Website,
  thumb: anAsset({
    url: thumbURL,
  }),
  view: aGalleryView({
    type: ViewType.Gallery,
    width: 780,
    height: 440,
    gallery: [
      anAsset({ url: imageURL }),
      anAsset({ url: imageURL2 }),
      anAsset({ url: imageURL3 }),
    ],
  }),
});

export const projectIframeAdvert: FprojectFragment = aProject({
  uid: "halifax-adverts",
  type: ProjectType.Advert,
  thumb: anAsset({
    url: thumbURL,
  }),
  view: anIframeView({
    url: iFrameURL,
    width: 300,
    height: 250,
    type: ViewType.Iframe,
  }),
});

export const projectVideoApp: FprojectFragment = aProject({
  uid: "seat-leon-sc",
  type: ProjectType.App,
  thumb: anAsset({
    url: thumbURL,
  }),
  view: aVideoView({
    type: ViewType.Video,
    width: 1178,
    height: 718,
    poster: anAsset({
      url: posterURL,
    }),
    video: anAsset({
      url: videoURL,
    }),
  }),
});

export const globalData = aGlobal();

export const aboutPageData = aPage();

export const sampleProjects: FprojectFragment[] = [
  projectGalleryWebsite,
  projectIframeAdvert,
  projectVideoApp,
];

export const sampleAllData: AllDataQuery = {
  global: globalData,
  page: aboutPageData,
  projects: sampleProjects,
};

export const sampleGQLData = {
  data: {
    ...sampleAllData,
  },
};

export const sampleGQLError = {
  data: null,
  errors: [{ message: "mock gql error message" }],
};
