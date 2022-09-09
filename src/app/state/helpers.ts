import type { ICheckbox, IMainData } from "./types";

/**
 * Add Type definition to the action payload
 * e.g.
 * type MyType = { id: string; checked: boolean };
 * const SOMETHING_CHANGED = createAction( "SOMETHING_CHANGED", withPayloadType<MyType>() );
 */
export function withPayloadType<T>() {
  return (t: T) => {
    return { payload: t };
  };
}

/**
 * filters which thumbs to show depending on which checkboxes are checked
 */
export const thumbHelper = (
  mainData: IMainData[],
  checkboxes: ICheckbox[]
): IMainData[] => {
  const showSites = checkboxes.find((cb) => {
    return cb.id === "site";
  })?.checked;

  const showApps = checkboxes.find((cb) => {
    return cb.id === "app";
  })?.checked;

  const showAds = checkboxes.find((cb) => {
    return cb.id === "banner";
  })?.checked;

  return mainData
    .filter((obj) => {
      return (
        (showSites && obj.type === "site") ||
        (showApps && obj.type === "app") ||
        (showAds && obj.type === "banner")
      );
    })
    .sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });
};
