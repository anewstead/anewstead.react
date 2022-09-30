import mainDataMock from "../../api/mock/mainDataMock.json";
import type { AppState } from "../store";
import type { IMainData } from "../main-data/state";
import { NAV_CHECKBOX_CHANGE, homeReducer } from "./slice";
import type { NCCPayload } from "./slice";
import { setupStore } from "../store";

const MAIN_DATA: IMainData[] = JSON.parse(JSON.stringify(mainDataMock));

test("changes displayThumbs", async () => {
  const payload: NCCPayload = {
    checkbox: { id: "site", checked: false },
    allThumbs: MAIN_DATA,
  };
  const store = setupStore({ home: homeReducer });
  const thumbs = (store.getState() as AppState).home.displayThumbs;
  await store.dispatch(NAV_CHECKBOX_CHANGE(payload));
  const newThumbs = (store.getState() as AppState).home.displayThumbs;
  expect(newThumbs).not.toStrictEqual(thumbs);
});

test("throws an Error for unknown checkbox", async () => {
  const payload: NCCPayload = {
    checkbox: { id: "unknown", checked: false },
    allThumbs: MAIN_DATA,
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
