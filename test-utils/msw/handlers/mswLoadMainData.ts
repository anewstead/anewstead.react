import { rest } from "msw";

import { HYG_GQL } from "../../../src/const";
import { sampleGQLData, sampleGQLError } from "../mockJson";

export const mswLoadMainData = rest.post(HYG_GQL, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(sampleGQLData));
});

export const mswLoadMainDataError = rest.post(HYG_GQL, (req, res, ctx) => {
  return res(
    ctx.status(400),
    ctx.json({ message: "400: msw intended reject" })
  );
});

export const mswLoadMainDataGqlError = rest.post(HYG_GQL, (req, res, ctx) => {
  return res(ctx.status(400), ctx.json(sampleGQLError));
});
