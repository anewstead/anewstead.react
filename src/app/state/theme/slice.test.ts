import type { AppState } from "../store";
import { INIT_THEME, TOGGLE_THEME, themeReducer } from "./slice";
import { setupStore } from "../store";

test("sets and toggles themeName", async () => {
  const store = setupStore({ theme: themeReducer });
  await store.dispatch(INIT_THEME());
  const initTheme = (store.getState() as AppState).theme.themeName;
  expect(initTheme).toBeDefined();
  await store.dispatch(TOGGLE_THEME());
  const toggleTheme = (store.getState() as AppState).theme.themeName;
  expect(toggleTheme).not.toStrictEqual(initTheme);
});
