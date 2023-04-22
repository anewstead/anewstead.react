import mainDataMock from "../../services/__mocks__/mainDataMock.json";
import type { AppState } from "../store";
import type { IMainData } from "../main-data/state";
import { INIT_DISPLAY_THUMBS, NAV_CHECKBOX_CHANGE, homeReducer } from "./slice";
import type {
  InitDisplayThumbsPayload,
  NavCheckboxChangePayload,
} from "./slice";
import { setupStore } from "../store";

const MAIN_DATA: IMainData[] = JSON.parse(JSON.stringify(mainDataMock));

test("init displayThumbs", async () => {
  const payload: InitDisplayThumbsPayload = {
    allThumbs: MAIN_DATA,
  };
  const store = setupStore({ home: homeReducer });
  const preThumbs = (store.getState() as AppState).home.displayThumbs;
  expect(preThumbs).not.toBeDefined();
  await store.dispatch(INIT_DISPLAY_THUMBS(payload));
  const postThumbs = (store.getState() as AppState).home.displayThumbs;
  expect(postThumbs?.length).toEqual(MAIN_DATA.length);
});

test("checkbox changes displayThumbs", async () => {
  const payload: NavCheckboxChangePayload = {
    checkbox: { id: "site", checked: false },
    allThumbs: MAIN_DATA,
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
