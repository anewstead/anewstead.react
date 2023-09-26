import type { AllDataQuery } from "../../services/hygraph/generated/graphql";

export type IFetchMainDataState = {
  data: AllDataQuery | null;
  error: string | null;
  loading: boolean;
  loaded: boolean;
};

export const initialState: IFetchMainDataState = {
  data: null,
  error: null,
  loading: false,
  loaded: false,
};
