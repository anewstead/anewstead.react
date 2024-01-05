import { setupStore } from "@/state/store";
import { sampleProjects } from "@testing/msw/mockJson";

import { INIT_DISPLAY_THUMBS, NAV_CHECKBOX_CHANGE, homeReducer } from "./slice";

import type {
  InitDisplayThumbsPayload,
  NavCheckboxChangePayload,
} from "./slice";
import type { TNavCheckState } from "@/components/head-nav-thumbs";
import type { AppState } from "@/state/store";

const CB: TNavCheckState = [
  { id: "a", label: "aa", checked: true },
  { id: "b", label: "bb", checked: true },
  { id: "c", label: "cc", checked: true },
];

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
  const testCB: TNavCheckState = [...CB];
  testCB[0].checked = false;
  const payload: NavCheckboxChangePayload = {
    navCheckState: testCB,
    projects: sampleProjects,
  };
  const store = setupStore({ home: homeReducer });
  store.dispatch(NAV_CHECKBOX_CHANGE(payload));
  const preThumbs = (store.getState() as AppState).home.nav;
  store.dispatch(NAV_CHECKBOX_CHANGE(payload));
  const posthumbs = (store.getState() as AppState).home.displayThumbs;
  expect(posthumbs).not.toStrictEqual(preThumbs);
});
