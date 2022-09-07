/* eslint-disable no-param-reassign */
/**
 * Redux Toolkit allows "mutating" logic for state in reducers via Immer library.
 * so we allow eslint param-reassign
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import initialState from "./initialState";
import type { IAppDispatch, IRootState } from "./types";
import { initThemeName, toggleThemeName } from "../theme/theme";
import { thumbHelper } from "./helpers";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => IAppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export const FETCH_MAIN_DATA = createAsyncThunk(
  "fetchJsonData",
  async (url: string) => {
    // session cache to avoid lots of calls to API during dev
    const ssData = sessionStorage.getItem("data");
    if (ssData) {
      return JSON.parse(ssData);
    }
    const response = await fetch(url);
    const data = await response.json();
    sessionStorage.setItem("data", JSON.stringify(data));
    return data;
  }
);

// ReduxToolKit createSlice() creates state, actions and reducers from one object
// remember to export reducer functions as slice.actions
const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    INIT_THEME: (state) => {
      state.themeName = initThemeName();
    },
    TOGGLE_THEME: (state) => {
      state.themeName = toggleThemeName();
    },
    NAV_CHECKBOX_CHANGE: (state, action) => {
      const checkbox = state.nav.checkboxes.find((obj) => {
        return obj.id === action.payload.id;
      });
      if (!checkbox) {
        throw new Error(`store: cannot find checkbox: ${action.payload.id}`);
      } else {
        checkbox.checked = action.payload.checked; // 2 way bind
      }
      state.displayThumbs = thumbHelper(state.mainData, state.nav.checkboxes);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(FETCH_MAIN_DATA.fulfilled, (state, action) => {
      state.mainData = action.payload;
      state.displayThumbs = thumbHelper(state.mainData, state.nav.checkboxes);
    });
    builder.addCase(FETCH_MAIN_DATA.rejected, (state) => {
      state.mainDataLoadFail = true;
    });
  },
});

const store = configureStore({
  reducer: {
    app: slice.reducer,
  },
});

export const { INIT_THEME, TOGGLE_THEME, NAV_CHECKBOX_CHANGE } = slice.actions;

export default store;
