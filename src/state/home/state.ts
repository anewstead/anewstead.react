import { ProjectType } from "@/services/hygraph/generated/graphql";

import type { FprojectFragment } from "@/services/hygraph/generated/graphql";

export type ICheckbox = {
  id: ProjectType;
  label: string;
  checked: boolean;
};

type IHomePageState = {
  displayThumbs: FprojectFragment[] | undefined;
  nav: {
    checkboxes: ICheckbox[];
  };
};

export const initialState: IHomePageState = {
  displayThumbs: undefined,
  nav: {
    checkboxes: [
      {
        id: ProjectType.Website,
        label: "Websites",
        checked: true,
      },
      {
        id: ProjectType.App,
        label: "Apps",
        checked: true,
      },
      {
        id: ProjectType.Advert,
        label: "Adverts",
        checked: true,
      },
    ],
  },
};
