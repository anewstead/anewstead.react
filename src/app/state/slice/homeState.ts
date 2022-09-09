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
    brand: string;
    checkboxes: ICheckbox[];
  };
};

export const initialState: IHomePageState = {
  displayThumbs: [],
  nav: {
    brand: "Andrew Newstead",
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
