import { rest } from "msw";

import mainDataMock from "./mainDataMock.json";
import { MAIN_DATA_URL } from "../../const";
import { adBlockTestURL } from "../../../hooks/useDetectAdBlock";
import { serverResponseStatus } from "./status";

const loadMainData = rest.get(MAIN_DATA_URL, (req, res, ctx) => {
  switch (serverResponseStatus.get()) {
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

const adBlockTest = rest.head(adBlockTestURL, (req, res, ctx) => {
  switch (serverResponseStatus.get()) {
    case 403:
      return res.networkError("mock handler intended blocked by client");
    case 200:
    default:
      return res(ctx.status(200));
  }
});

export const handlers = [loadMainData, adBlockTest];
