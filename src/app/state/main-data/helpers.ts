export const SS_KEY_MAINDATA = "mainData";

export const getSessionMainData = () => {
  const ssData = sessionStorage.getItem(SS_KEY_MAINDATA);
  return ssData ? JSON.parse(ssData) : null;
};

export const setSessionMainData = (data: {} | [] | null) => {
  sessionStorage.setItem(SS_KEY_MAINDATA, JSON.stringify(data));
};

export const removeSessionMainData = () => {
  sessionStorage.removeItem(SS_KEY_MAINDATA);
};
