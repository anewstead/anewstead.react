import { rest } from "msw";

import { adBlockTestURL } from "../../../src/hooks/useDetectAdBlock";

export const mswDetectAdBlock = rest.head(adBlockTestURL, (req, res, ctx) => {
  return res(ctx.status(200));
});

export const mswDetectAdBlockBlocked = rest.head(adBlockTestURL, (req, res) => {
  return res.networkError("msw intended reject");
});
