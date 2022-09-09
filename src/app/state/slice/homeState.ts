import type { IMainData, IProjectType } from "./mainDataState";
import { PROJECT_TYPE } from "./mainDataState";

export const PROJECT_LABEL = {
  WEBSITES: "Websites",
  APPS: "Apps",
  ADVERTS: "Adverts",
};

export type IProjectLabel =
  | typeof PROJECT_LABEL.WEBSITES
  | typeof PROJECT_LABEL.APPS
  | typeof PROJECT_LABEL.ADVERTS;

export type ICheckbox = {
  id: IProjectType;
  label: IProjectLabel;
  checked: boolean;
};

type IHomePageState = {
  displayThumbs: IMainData[];
  nav: {
    checkboxes: ICheckbox[];
  };
};

export const initialState: IHomePageState = {
  displayThumbs: [],
  nav: {
    checkboxes: [
      {
        id: PROJECT_TYPE.SITE,
        label: PROJECT_LABEL.WEBSITES,
        checked: true,
      },
      {
        id: PROJECT_TYPE.APP,
        label: PROJECT_LABEL.APPS,
        checked: true,
      },
      {
        id: PROJECT_TYPE.BANNER,
        label: PROJECT_LABEL.ADVERTS,
        checked: true,
      },
    ],
  },
};
