export type IProjectType = "site" | "app" | "banner";
export type IProjectTech = "flash" | "html";
export type IProjectView = "gallery" | "video" | "iframe" | "testNoMatch";

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

export type IFetchMainDataState = {
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
