import { renderHook, waitFor } from "@testing-library/react";

import { serverResponseStatus } from "../core/services/mock/status";
import { useDetectAdBlock } from "./useDetectAdBlock";

test("adBlock NOT Detected", async () => {
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

test("adBlock IS Detected", async () => {
  serverResponseStatus.set(403);
  // msw@1.1.0 creates a console error log when using res.networkError()
  // despite this being the intended exception as per their docs
  // to avoid confussion we mock/spyOn the error to hide it
  // if this test ever fails, start debug by removing ths mock
  const consoleErrorFn = jest.spyOn(console, "error").mockImplementation(() => {
    return jest.fn();
  });
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
  consoleErrorFn.mockClear();
});
