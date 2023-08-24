import type { ICheckbox } from "./state";
import type { IProject } from "../main-data/state";

// filters which thumbs to show depending on which checkboxes are checked
export const thumbHelper = (
  allThumbs: IProject[],
  checkboxes: ICheckbox[]
): IProject[] => {
  const showSites = checkboxes.find((cb) => {
    return cb.id === "website";
  })?.checked;

  const showApps = checkboxes.find((cb) => {
    return cb.id === "app";
  })?.checked;

  const showAds = checkboxes.find((cb) => {
    return cb.id === "advert";
  })?.checked;

  return allThumbs
    .filter((obj) => {
      return (
        (showSites && obj.type === "website") ||
        (showApps && obj.type === "app") ||
        (showAds && obj.type === "advert")
      );
    })
    .sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });
};
