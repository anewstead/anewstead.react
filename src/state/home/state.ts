import type { IProject, IProjectType } from "../main-data/state";

export type IProjectLabel = "Websites" | "Apps" | "Adverts";

export type ICheckbox = {
  id: IProjectType;
  label: IProjectLabel;
  checked: boolean;
};

type IHomePageState = {
  displayThumbs: IProject[] | undefined;
  nav: {
    checkboxes: ICheckbox[];
  };
};

export const initialState: IHomePageState = {
  displayThumbs: undefined,
  nav: {
    checkboxes: [
      {
        id: "website",
        label: "Websites",
        checked: true,
      },
      {
        id: "app",
        label: "Apps",
        checked: true,
      },
      {
        id: "advert",
        label: "Adverts",
        checked: true,
      },
    ],
  },
};
