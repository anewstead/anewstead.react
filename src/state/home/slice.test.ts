import { sampleFetchData } from "../../../test-utils/msw/mockJson";
import { setupStore } from "../store";

import { INIT_DISPLAY_THUMBS, NAV_CHECKBOX_CHANGE, homeReducer } from "./slice";

import type {
  InitDisplayThumbsPayload,
  NavCheckboxChangePayload,
} from "./slice";
import type { AppState } from "../store";

const sampleData = sampleFetchData.data!;

test("init displayThumbs", async () => {
  const payload: InitDisplayThumbsPayload = {
    allThumbs: sampleData.projects,
  };
  const store = setupStore({ home: homeReducer });
  const preThumbs = (store.getState() as AppState).home.displayThumbs;
  expect(preThumbs).not.toBeDefined();
  await store.dispatch(INIT_DISPLAY_THUMBS(payload));
  const postThumbs = (store.getState() as AppState).home.displayThumbs;
  expect(postThumbs?.length).toEqual(sampleData.projects.length);
});

test("checkbox changes displayThumbs", async () => {
  const payload: NavCheckboxChangePayload = {
    checkbox: { id: "website", checked: false },
    allThumbs: sampleData.projects,
  };
  const store = setupStore({ home: homeReducer });
  await store.dispatch(NAV_CHECKBOX_CHANGE(payload));
  const preThumbs = (store.getState() as AppState).home.nav;
  await store.dispatch(NAV_CHECKBOX_CHANGE(payload));
  const posthumbs = (store.getState() as AppState).home.displayThumbs;
  expect(posthumbs).not.toStrictEqual(preThumbs);
});

test("throws an Error for unknown checkbox", async () => {
  const payload: NavCheckboxChangePayload = {
    checkbox: { id: "unknown", checked: false },
    allThumbs: sampleData.projects,
  };
  const store = setupStore({ home: homeReducer });
  let gotError = false;
  try {
    store.dispatch(NAV_CHECKBOX_CHANGE(payload));
  } catch (error) {
    gotError = true;
  }
  expect(gotError).toBeTruthy();
});
