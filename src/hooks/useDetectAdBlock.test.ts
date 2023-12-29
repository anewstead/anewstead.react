import { renderHook, waitFor } from "@testing-library/react";

import { mswDetectAdBlockBlocked } from "@testing/msw/handlers/mswDetectAdBlock";
import { server } from "@testing/msw/server";

import { useDetectAdBlock } from "./useDetectAdBlock";

test("adBlock NOT Detected", async () => {
  const { result } = renderHook(() => {
    return useDetectAdBlock();
  });
  expect(result.current).toEqual({
    adblockCheckComplete: false,
    adBlockDetected: false,
  });
  await waitFor(() => {
    expect(result.current.adblockCheckComplete).toBeTruthy();
  });
  expect(result.current).toEqual({
    adblockCheckComplete: true,
    adBlockDetected: false,
  });
});

test("adBlock IS Detected", async () => {
  server.use(mswDetectAdBlockBlocked);
  const { result } = renderHook(() => {
    return useDetectAdBlock();
  });
  await waitFor(() => {
    expect(result.current.adblockCheckComplete).toBeTruthy();
  });
  expect(result.current).toEqual({
    adblockCheckComplete: true,
    adBlockDetected: true,
  });
});
