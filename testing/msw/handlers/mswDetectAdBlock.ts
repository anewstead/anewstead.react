import { http, HttpResponse } from "msw";

import { adBlockTestURL } from "@/hooks/useDetectAdBlock";

export const mswDetectAdBlock = http.head(adBlockTestURL, () => {
  return new HttpResponse(null, {
    status: 200,
  });
});

export const mswDetectAdBlockBlocked = http.head(adBlockTestURL, () => {
  return HttpResponse.error();
});
