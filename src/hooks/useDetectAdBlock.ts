/*
USE:
const { adblockChecked, adBlockDetected } = useDetectAdBlock();
if (!adblockChecked) {
  return <></>;// always return empty, see testing.
}
if (adBlockDetected) {
  return <div data-testid="blocked">...</div>
}
return <div data-testid="not-blocked">...</div>

UNIT TEST (ts):
ensures this function returns as expected

INTEGRATION TESTING (tsx):
pre adblockChecked content could be tested for, but not for it being removed
i.e. React-Testing-Library waitForElementToBeRemoved() does not consistantlty work in this case
maybe related to the intentional network error thrown by mock-service-worker.
the detect is so fast you shouldn't need pre adblockChecked content anyway
therfore pre adblockChecked content is just empty jsx
and the test is to wait for the post adblockChecked content (blocked || not-blocked)
await waitFor(() => {
  expect(canvas.getByTestId("blocked")).toBeInTheDocument();
});
*/

import { useEffect, useState } from "react";

// https://github.com/topics/adguard-blocklist
export const adBlockTestURL = "https://ad-emea.doubleclick.net";

export const useDetectAdBlock = () => {
  const [adblockCheckComplete, setAdblockCheckComplete] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    if (!adblockCheckComplete) {
      fetch(adBlockTestURL, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
      })
        .catch(() => {
          setAdBlockDetected(true);
        })
        .finally(() => {
          setAdblockCheckComplete(true);
        });
    }
  }, [adblockCheckComplete]);

  return { adblockCheckComplete, adBlockDetected };
};
