import { http, HttpResponse } from "msw";

import { HYG_GQL } from "../../../src/const";
import { sampleGQLData, sampleGQLError } from "../mockJson";

export const mswLoadMainData = http.post(HYG_GQL, () => {
  return HttpResponse.json(sampleGQLData);
});

export const mswLoadMainDataError = http.post(HYG_GQL, () => {
  return HttpResponse.error();
});

export const mswLoadMainDataGqlError = http.post(HYG_GQL, () => {
  return HttpResponse.json(sampleGQLError, {
    status: 400,
  });
});
