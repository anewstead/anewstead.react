import { ProjectType } from "@/services/hygraph/generated/graphql";

import type { TNavCheckState } from "@/components/head-nav-thumbs";
import type { FprojectFragment } from "@/services/hygraph/generated/graphql";

type IHomePageState = {
  displayThumbs: FprojectFragment[] | undefined;
  nav: {
    checkboxes: TNavCheckState;
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
