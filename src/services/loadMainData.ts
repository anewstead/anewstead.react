import AllData from "./hygraph/allData.gql";
import { ProjectOrderByInput } from "./hygraph/generated/graphql";
import { gqlRequest } from "./hygraph/utils";

import type {
  AllDataQuery,
  AllDataQueryVariables,
} from "./hygraph/generated/graphql";

export const loadMainData = async () => {
  return gqlRequest<AllDataQuery, AllDataQueryVariables>(AllData, {
    first: 50,
    orderBy: ProjectOrderByInput.DateDesc,
  });
};
