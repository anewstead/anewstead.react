import { renderHook, waitFor } from "@testing-library/react";

import { server } from "../core/services/mock/server";
import { useDetectAdBlock } from "./useDetectAdBlock";

test("returns false", async () => {
  const { result } = renderHook(() => {
    return useDetectAdBlock();
  });
  expect(result.current).toEqual({
    adblockChecked: false,
    adBlockDetected: false,
  });
  await waitFor(() => {
    expect(result.current.adblockChecked).toBeTruthy();
  });
  expect(result.current).toEqual({
    adblockChecked: true,
    adBlockDetected: false,
  });
});

test("returns true", async () => {
  server.setStatus(403);
  const { result } = renderHook(() => {
    return useDetectAdBlock();
  });
  await waitFor(() => {
    expect(result.current.adblockChecked).toBeTruthy();
  });
  expect(result.current).toEqual({
    adblockChecked: true,
    adBlockDetected: true,
  });
});
