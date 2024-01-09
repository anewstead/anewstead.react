import { setupStore } from "@/state/store";

import { NAV_CHECKBOX_CHANGE, homeReducer } from "./slice";

import type { NavCheckboxChangePayload } from "./slice";
import type { AppState } from "@/state/store";

test("checkbox changes redux state", () => {
  const store = setupStore({ home: homeReducer });
  const preCheckbox = (store.getState() as AppState).home.nav.checkboxes;

  const testCB = structuredClone(preCheckbox);
  testCB[0].checked = false;

  const payload = {
    navCheckState: testCB,
  } as NavCheckboxChangePayload;

  store.dispatch(NAV_CHECKBOX_CHANGE(payload));

  const postCheckbox = (store.getState() as AppState).home.nav.checkboxes;

  expect(postCheckbox).not.toStrictEqual(preCheckbox);
});
