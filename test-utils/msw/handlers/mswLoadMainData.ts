import { rest } from "msw";

import { HYG_GQL } from "../../../src/const";
import { sampleFetchData, sampleFetchError } from "../mockJson";

export const mswLoadMainData = rest.post(HYG_GQL, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(sampleFetchData));
});

export const mswLoadMainDataNoContent = rest.post(HYG_GQL, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(sampleFetchError));
});

export const mswLoadMainDataReject = rest.post(HYG_GQL, (req, res, ctx) => {
  return res(
    ctx.status(400),
    ctx.json({ message: "400: msw intended reject" })
  );
});
