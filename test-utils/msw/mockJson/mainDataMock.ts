import type {
  IFetchMainDataState,
  IProject,
} from "../../../src/state/main-data/state";

export const galleryProjectData: IProject = {
  uid: "gxlabs",
  agency: "Haygarth",
  brand: "GX Labs",
  title: "G-Cide",
  type: "website",
  info: {
    html: "<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>",
  },
  view: {
    width: 780,
    type: "gallery",
    height: 440,
    gallery: [
      {
        url: "https://media.graphassets.com/output=format:jpg/3xnDvAVbROkrwjRYKUQo",
      },
      {
        url: "https://media.graphassets.com/output=format:jpg/X8RUyEpRkeTWvLnNk7IA",
      },
      {
        url: "https://media.graphassets.com/output=format:jpg/fYpU6VYcQFyrJA2mHI54",
      },
    ],
  },
  thumb: {
    url: "https://media.graphassets.com/output=format:jpg/i8D7TaB2TASh2Tm9GZRh",
  },
};

export const videoProjectData: IProject = {
  uid: "itn-your-news",
  agency: "Global Beach",
  brand: "ITN",
  title: "Your News",
  type: "app",
  info: {
    html: "<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>",
  },
  view: {
    type: "video",
    width: 696,
    height: 222,
    video: {
      url: "https://media.graphassets.com/Wocvrk1WS3K8igs7FtqQ",
    },
    poster: {
      url: "https://media.graphassets.com/output=format:jpg/YfcM7Y3UTtyKqZLqPqvR",
    },
  },
  thumb: {
    url: "https://media.graphassets.com/output=format:jpg/svseUMgDSZun7Oh4O9dw",
  },
};

export const iframeProjectData: IProject = {
  uid: "halifax-adverts",
  agency: "TSL Digital",
  brand: "Halifax",
  title: "Hanna Barbara",
  type: "advert",
  info: {
    html: "<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>",
  },
  view: {
    height: 250,
    type: "iframe",
    url: "https://anewstead-content.netlify.app/sites/halifax/index.html",
    width: 300,
  },
  thumb: {
    url: "https://media.graphassets.com/output=format:jpg/qQDj3pVtTXyqpVWKeEIm",
  },
};

export const unknownProjectTypeData: IProject = {
  ...galleryProjectData,
  uid: "non-existing-id",
  view: {
    ...galleryProjectData.view,
    type: "testNoMatch",
  },
};

export const sampleFetchData: IFetchMainDataState = {
  data: {
    projects: [
      galleryProjectData,
      videoProjectData,
      iframeProjectData,
      unknownProjectTypeData,
    ],
  },
  errors: undefined,
  loading: false,
  loaded: true,
  rejected: false,
};

export const sampleFetchError: IFetchMainDataState = {
  data: null,
  errors: [
    {
      message: "mocked error message",
    },
  ],
  loading: false,
  loaded: true,
  rejected: false,
};
