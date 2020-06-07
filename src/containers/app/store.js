import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { detectColorTheme, toggleColorTheme } from "./themes";

export const FETCH_MAIN_DATA = createAsyncThunk(
  "fetchJsonData",
  async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

// ReduxToolKit createSlice() creates state, actions and reducers from one object
// remember to export reducer functions as slice.actions
const slice = createSlice({
  name: "app",
  initialState: {
    baseContentURL: "https://anewstead-content.netlify.app/",
    mainData: null,
    theme: detectColorTheme(),
    nav: {
      brand: "BRAND",
      checkboxes: [
        {
          id: "sites",
          label: "Websites",
          checked: true,
        },
        {
          id: "apps",
          label: "Apps",
          checked: true,
        },
        {
          id: "banners",
          label: "Banners",
          checked: true,
        },
      ],
    },
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    TOGGLE_THEME: (state, action) => {
      state.theme = toggleColorTheme();
    },
    NAV_CHECKBOX_CHANGE: (state, action) => {
      const checkbox = state.nav.checkboxes.find((obj) => {
        return obj.id === action.payload.id;
      });
      checkbox.checked = action.payload.checked;
    },
  },
  extraReducers: {
    [FETCH_MAIN_DATA.fulfilled]: (state, action) => {
      state.mainData = action.payload;
    },
    [FETCH_MAIN_DATA.rejected]: (state, action) => {
      state.mainData = "rejected";
    },
  },
});

const store = configureStore({
  reducer: {
    app: slice.reducer,
  },
});

export const { TOGGLE_THEME, NAV_CHECKBOX_CHANGE } = slice.actions;
export default store;
