import { useEffect, useState } from "react";

export const useDetectAdBlock = () => {
  const [adblockChecked, setAdblockChecked] = useState(false);
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    // choose from here if url no longer triggers adblock
    // https://github.com/topics/adguard-blocklist
    const url = "https://ad-emea.doubleclick.net";
    fetch(url, {
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
  }, []);

  return { adblockChecked, adBlockDetected };
};
