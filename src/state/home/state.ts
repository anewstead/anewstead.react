import { ProjectType } from "@/services/hygraph/generated/graphql";

import type { TNavCheckState } from "@/components/headNavThumbs";

type IHomePageState = {
  nav: {
    checkboxes: TNavCheckState;
  };
};

export const initialState: IHomePageState = {
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
