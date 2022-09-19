import { INIT_THEME, TOGGLE_THEME, themeReducer } from "./slice";
import { setupStore } from "../store";

test("sets and toggles themeName", async () => {
  const store = setupStore({ theme: themeReducer });
  await store.dispatch(INIT_THEME());
  const initTheme = store.getState().theme.themeName;
  expect(initTheme).toBeDefined();
  await store.dispatch(TOGGLE_THEME());
  const toggleTheme = store.getState().theme.themeName;
  expect(toggleTheme === initTheme).toBeFalsy();
});
