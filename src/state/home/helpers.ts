import { ProjectType } from "../../services/hygraph/generated/graphql";

import type { ICheckbox } from "./state";
import type { FprojectFragment } from "../../services/hygraph/generated/graphql";

// filters which thumbs to show depending on which checkboxes are checked
export const thumbHelper = (
  allThumbs: FprojectFragment[],
  checkboxes: ICheckbox[]
): FprojectFragment[] => {
  const showSites = checkboxes.find((cb) => {
    return cb.id === ProjectType.Website;
  })?.checked;

  const showApps = checkboxes.find((cb) => {
    return cb.id === ProjectType.App;
  })?.checked;

  const showAds = checkboxes.find((cb) => {
    return cb.id === ProjectType.Advert;
  })?.checked;

  return allThumbs
    .filter((obj) => {
      return (
        (showSites && obj.type === ProjectType.Website) ||
        (showApps && obj.type === ProjectType.App) ||
        (showAds && obj.type === ProjectType.Advert)
      );
    })
    .sort((a, b) => {
      return Number(b.uid) - Number(a.uid);
    });
};
