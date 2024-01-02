import { setupStore } from "@/state/store";
import { mswLoadMainDataError } from "@testing/msw/handlers/mswLoadMainData";
import { server } from "@testing/msw/server";

import { getSessionMainData, removeSessionMainData } from "./helpers";
import { FETCH_MAIN_DATA, mainDataReducer } from "./slice";

import type { AppState } from "@/state/store";

afterEach(() => {
  // FETCH_MAIN_DATA caches loaded data
  // this clears it before running next test
  removeSessionMainData();
});

test("FETCH_MAIN_DATA fulfilled", async () => {
  const store = setupStore({ mainData: mainDataReducer });
  await store.dispatch(FETCH_MAIN_DATA());
  const state = store.getState() as AppState;
  expect(state.mainData.loaded).toBeTruthy();
  expect(state.mainData.data?.projects.length).toBeGreaterThan(0);
  expect(getSessionMainData()).toBeDefined();
});

test("FETCH_MAIN_DATA rejected", async () => {
  server.use(mswLoadMainDataError);
  const store = setupStore({ mainData: mainDataReducer });
  await store.dispatch(FETCH_MAIN_DATA());
  const state = store.getState() as AppState;
  expect(state.mainData.error).toBeTruthy();
  expect(state.mainData.data).toBeNull();
  expect(getSessionMainData()).toBeNull();
});
