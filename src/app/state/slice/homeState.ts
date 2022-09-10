import type { IMainData, IProjectType } from "./mainDataState";

export type IProjectLabel = "Websites" | "Apps" | "Adverts";

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
        id: "site",
        label: "Websites",
        checked: true,
      },
      {
        id: "app",
        label: "Apps",
        checked: true,
      },
      {
        id: "banner",
        label: "Adverts",
        checked: true,
      },
    ],
  },
};
