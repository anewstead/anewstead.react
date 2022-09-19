import mainData, { FETCH_MAIN_DATA } from "./slice";
import type { RootState } from "../store";
import { getSessionMainData, removeSessionMainData } from "./helpers";
import { server } from "../../api/mock/server";
import { setupStore } from "../store";

afterEach(() => {
  // FETCH_MAIN_DATA caches loaded data
  // must clear it before runnig next test
  removeSessionMainData();
});

test("FETCH_MAIN_DATA fulfilled", async () => {
  const store = setupStore({ mainData });
  await store.dispatch(FETCH_MAIN_DATA());
  const state = store.getState() as RootState;
  expect(state.mainData.loaded).toBeTruthy();
  expect(state.mainData.data.length).toBeGreaterThan(0);
  expect(getSessionMainData()).toBeDefined();
});

test("FETCH_MAIN_DATA rejected", async () => {
  server.setStatus(400);
  const store = setupStore({ mainData });
  await store.dispatch(FETCH_MAIN_DATA());
  const state = store.getState() as RootState;
  expect(state.mainData.error).toBeTruthy();
  expect(state.mainData.data).toEqual([]);
  expect(getSessionMainData()).toBeNull();
});
