export const PROJECT_TYPE = {
  SITE: "site",
  APP: "app",
  BANNER: "banner",
};

export type IProjectType =
  | typeof PROJECT_TYPE.SITE
  | typeof PROJECT_TYPE.APP
  | typeof PROJECT_TYPE.BANNER;

export const PROJECT_TECH = {
  FLASH: "flash",
  HTML: "html",
};

export type IProjectTech = typeof PROJECT_TECH.FLASH | typeof PROJECT_TECH.HTML;

export const PROJECT_VIEW = {
  GALLERY: "gallery",
  VIDEO: "video",
  IFRAME: "iframe",
};

export type IProjectView =
  | typeof PROJECT_VIEW.GALLERY
  | typeof PROJECT_VIEW.VIDEO
  | typeof PROJECT_VIEW.IFRAME;

export type IMainData = {
  id: number;
  client: string;
  brand: string;
  project: string;
  type: IProjectType;
  tech: IProjectTech;
  thumb: string;
  view: {
    type: IProjectView;
    width: number;
    height: number;
    href: string;
    poster: string;
    still: string;
    stills: string[];
  };
  info: string;
};

type IFetchMainDataState = {
  loading: Boolean;
  loaded: Boolean;
  error: Boolean;
  data: IMainData[];
};

export const initialState: IFetchMainDataState = {
  loading: false,
  loaded: false,
  error: false,
  data: [],
};
