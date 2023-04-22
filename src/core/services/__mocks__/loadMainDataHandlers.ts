import { rest } from "msw";

import mainDataMock from "./mainDataMock.json";
import { MAIN_DATA_URL } from "../../const";

// default
export const mswLoadMainData = rest.get(MAIN_DATA_URL, (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(mainDataMock));
});

export const mswLoadMainDataNoContent = rest.get(
  MAIN_DATA_URL,
  (req, res, ctx) => {
    return res(ctx.status(204), ctx.json([]));
  }
);

export const mswLoadMainDataReject = rest.get(
  MAIN_DATA_URL,
  (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ message: "mock handler intended reject" })
    );
  }
);
