import { INIT_THEME, TOGGLE_THEME, themeReducer } from "./slice";
import type { RootState } from "../store";
import { setupStore } from "../store";

test("sets and toggles themeName", async () => {
  const store = setupStore({ theme: themeReducer });
  await store.dispatch(INIT_THEME());
  const initTheme = (store.getState() as RootState).theme.themeName;
  expect(initTheme).toBeDefined();
  await store.dispatch(TOGGLE_THEME());
  const toggleTheme = (store.getState() as RootState).theme.themeName;
  expect(toggleTheme).not.toStrictEqual(initTheme);
});
