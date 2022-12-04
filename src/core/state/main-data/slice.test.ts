import type { AppState } from "../store";
import { FETCH_MAIN_DATA, mainDataReducer } from "./slice";
import { getSessionMainData, removeSessionMainData } from "./helpers";
import { server } from "../../services/mock/server";
import { setupStore } from "../store";

afterEach(() => {
  // FETCH_MAIN_DATA caches loaded data
  // must clear it before runnig next test
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
  server.setStatus(400);
  const store = setupStore({ mainData: mainDataReducer });
  await store.dispatch(FETCH_MAIN_DATA());
  const state = store.getState() as AppState;
  expect(state.mainData.error).toBeTruthy();
  expect(state.mainData.data).toEqual([]);
  expect(getSessionMainData()).toBeNull();
});
