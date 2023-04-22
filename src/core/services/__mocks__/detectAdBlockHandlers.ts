import { rest } from "msw";

import { adBlockTestURL } from "../../../hooks/useDetectAdBlock";

// default
export const mswDetectAdBlock = rest.head(adBlockTestURL, (req, res, ctx) => {
  return res(ctx.status(200));
});

export const mswDetectAdBlockBlocked = rest.head(adBlockTestURL, (req, res) => {
  return res.networkError("mock handler intended blocked by client");
});
