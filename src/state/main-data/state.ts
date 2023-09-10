export type IProjectType = "website" | "app" | "advert";
export type IProjectTech = "flash" | "html";
export type IProjectViewType = "gallery" | "video" | "iframe" | "testNoMatch";

export type IProject = {
  uid: string;
  agency: string;
  brand: string;
  title: string;
  type: IProjectType;
  info: {
    html: string;
  };
  thumb: {
    url: string;
  };
  view:
    | IProjectViewGallery
    | IProjectViewVideo
    | IProjectViewIframe
    | IProjectViewTestNoMatch;
};

export type IProjectViewGallery = {
  type: "gallery";
  width: number;
  height: number;
  gallery: {
    url: string;
  }[];
};
export type IProjectViewVideo = {
  type: "video";
  width: number;
  height: number;
  poster: {
    url: string;
  };
  video: {
    url: string;
  };
};
export type IProjectViewIframe = {
  type: "iframe";
  width: number;
  height: number;
  url: string;
};

export type IProjectViewTestNoMatch = {
  type: "testNoMatch";
};

export type IMainData = {
  projects: IProject[];
};

export type IFetchMainDataState = {
  data: IMainData | null;
  errors:
    | {
        message: string;
      }[]
    | undefined;
  loading: Boolean;
  loaded: Boolean;
  rejected: boolean;
};

export const initialState: IFetchMainDataState = {
  data: null,
  errors: undefined,
  loading: false,
  loaded: false,
  rejected: false,
};
