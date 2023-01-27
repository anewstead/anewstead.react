import { rest } from "msw";

import mainDataMock from "./mainDataMock.json";
import { MAIN_DATA_URL } from "../../const";
import { getStatus } from "./status";

const loadMainData = rest.get(MAIN_DATA_URL, (req, res, ctx) => {
  switch (getStatus()) {
    case 400:
      return res(
        ctx.status(400),
        ctx.json({ message: "mock handler intended reject" })
      );
    case 204:
      return res(ctx.status(204), ctx.json([]));
    case 200:
    default:
      return res(ctx.status(200), ctx.json(mainDataMock));
  }
});

const adBlockTest = rest.head(
  "https://ad-emea.doubleclick.net/",
  (req, res, ctx) => {
    switch (getStatus()) {
      case 403:
        return res.networkError("blocked by client");
      case 200:
      default:
        return res(ctx.status(200));
    }
  }
);

export const handlers = [loadMainData, adBlockTest];
