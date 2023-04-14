import type { AppState } from "../store";
import { FETCH_MAIN_DATA, mainDataReducer } from "./slice";
import { getSessionMainData, removeSessionMainData } from "./helpers";
import { serverResponseStatus } from "../../services/__mocks__/status";
import { setupStore } from "../store";

afterEach(() => {
  // FETCH_MAIN_DATA caches loaded data
  // must clear it before running next test
  removeSessionMainData();
});

test("FETCH_MAIN_DATA fulfilled", async () => {
  const store = setupStore({ mainData: mainDataReducer });
  await store.dispatch(FETCH_MAIN_DATA());
  const state = store.getState() as AppState;
  expect(state.mainData.loaded).toBeTruthy();
  expect(state.mainData.data.length).toBeGreaterThan(0);
  expect(getSessionMainData()).toBeDefined();
});

test("FETCH_MAIN_DATA rejected", async () => {
  serverResponseStatus.set(400);
  const store = setupStore({ mainData: mainDataReducer });
  await store.dispatch(FETCH_MAIN_DATA());
  const state = store.getState() as AppState;
  expect(state.mainData.error).toBeTruthy();
  expect(state.mainData.data).toEqual([]);
  expect(getSessionMainData()).toBeNull();
});
