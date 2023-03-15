// choose from here if url no longer triggers adblock
// https://github.com/topics/adguard-blocklist

import { useEffect, useState } from "react";

export const adBlockTestURL = "https://ad-emea.doubleclick.net";

export const useDetectAdBlock = () => {
  const [adblockChecked, setAdblockChecked] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    if (!adblockChecked) {
      fetch(adBlockTestURL, {
        method: "HEAD",
        mode: "no-cors",
        cache: "no-store",
      })
        .catch(() => {
          setAdBlockDetected(true);
        })
        .finally(() => {
          setAdblockChecked(true);
        });
    }
  }, [adblockChecked]);

  return { adblockChecked, adBlockDetected };
};
