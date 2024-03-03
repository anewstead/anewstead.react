import type { AllDataQuery } from "@/services/hygraph/generated/graphql";

export const SS_KEY_MAINDATA = "mainData";

export const getSessionMainData = () => {
  const ssData = sessionStorage.getItem(SS_KEY_MAINDATA);
  return ssData ? (JSON.parse(ssData) as AllDataQuery) : null;
};

export const setSessionMainData = (data: AllDataQuery | null) => {
  sessionStorage.setItem(SS_KEY_MAINDATA, JSON.stringify(data));
};

export const removeSessionMainData = () => {
  sessionStorage.removeItem(SS_KEY_MAINDATA);
};
