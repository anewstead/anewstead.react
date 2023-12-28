import { sampleProjects } from "../../../testing/msw/mockJson";
import { setupStore } from "../store";

import { INIT_DISPLAY_THUMBS, NAV_CHECKBOX_CHANGE, homeReducer } from "./slice";

import type {
  InitDisplayThumbsPayload,
  NavCheckboxChangePayload,
} from "./slice";
import type { AppState } from "../store";

test("init displayThumbs", () => {
  const payload: InitDisplayThumbsPayload = {
    projects: sampleProjects,
  };
  const store = setupStore({ home: homeReducer });
  const preThumbs = (store.getState() as AppState).home.displayThumbs;
  expect(preThumbs).not.toBeDefined();
  store.dispatch(INIT_DISPLAY_THUMBS(payload));
  const postThumbs = (store.getState() as AppState).home.displayThumbs;
  expect(postThumbs?.length).toEqual(sampleProjects.length);
});

test("checkbox changes displayThumbs", () => {
  const payload: NavCheckboxChangePayload = {
    checkbox: { id: "website", checked: false },
    projects: sampleProjects,
  };
  const store = setupStore({ home: homeReducer });
  store.dispatch(NAV_CHECKBOX_CHANGE(payload));
  const preThumbs = (store.getState() as AppState).home.nav;
  store.dispatch(NAV_CHECKBOX_CHANGE(payload));
  const posthumbs = (store.getState() as AppState).home.displayThumbs;
  expect(posthumbs).not.toStrictEqual(preThumbs);
});

test("throws an Error for unknown checkbox", () => {
  const payload: NavCheckboxChangePayload = {
    checkbox: { id: "unknown", checked: false },
    projects: sampleProjects,
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
