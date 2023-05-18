import { rest } from "msw";

import { MAIN_DATA_URL } from "../../../src/const";
import { mainDataMock } from "../mockJson";

export const mswLoadMainData = rest.get(MAIN_DATA_URL, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(mainDataMock));
});

export const mswLoadMainDataNoContent = rest.get(
  MAIN_DATA_URL,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }
);

export const mswLoadMainDataReject = rest.get(
  MAIN_DATA_URL,
  (req, res, ctx) => {
    return res(ctx.status(400), ctx.json({ message: "msw intended reject" }));
  }
);
