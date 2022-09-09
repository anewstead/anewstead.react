// import type { ICheckbox } from "../types";
import type { ICheckbox } from "./homeState";
import type { IMainData } from "./mainDataState";
import { PROJECT_TYPE } from "./mainDataState";

/**
 * filters which thumbs to show depending on which checkboxes are checked
 */
export const thumbHelper = (
  allThumbs: IMainData[],
  checkboxes: ICheckbox[]
): IMainData[] => {
  const showSites = checkboxes.find((cb) => {
    return cb.id === PROJECT_TYPE.SITE;
  })?.checked;

  const showApps = checkboxes.find((cb) => {
    return cb.id === PROJECT_TYPE.APP;
  })?.checked;

  const showAds = checkboxes.find((cb) => {
    return cb.id === PROJECT_TYPE.BANNER;
  })?.checked;

  return allThumbs
    .filter((obj) => {
      return (
        (showSites && obj.type === PROJECT_TYPE.SITE) ||
        (showApps && obj.type === PROJECT_TYPE.APP) ||
        (showAds && obj.type === PROJECT_TYPE.BANNER)
      );
    })
    .sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });
};
