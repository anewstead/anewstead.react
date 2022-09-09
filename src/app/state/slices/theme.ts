import { createSlice } from "@reduxjs/toolkit";

import {
  DEFAULT_THEME,
  initThemeName,
  toggleThemeName,
} from "../../theme/theme";

type IThemeState = {
  themeName: string;
};

const initialState: IThemeState = { themeName: DEFAULT_THEME };

const slice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    INIT_THEME: (state) => {
      state.themeName = initThemeName();
    },
    TOGGLE_THEME: (state) => {
      state.themeName = toggleThemeName();
    },
  },
});

export const { INIT_THEME, TOGGLE_THEME } = slice.actions;

export default slice.reducer;
