import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

import { loadMainData } from "../../services/loadMainData";

import {
  getSessionMainData,
  removeSessionMainData,
  setSessionMainData,
} from "./helpers";
import { initialState } from "./state";

// if session cache return it otherwise load
export const FETCH_MAIN_DATA = createAsyncThunk("FETCH_MAIN_DATA", async () => {
  return getSessionMainData() || loadMainData();
});

export const mainDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH_MAIN_DATA.pending, (state) => {
      removeSessionMainData();
      state.data = null;
      state.errors = undefined;
      state.loading = true;
      state.loaded = false;
      state.rejected = false;
    })
    .addCase(FETCH_MAIN_DATA.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.errors = action.payload.errors;
      state.loading = false;
      state.loaded = true;
      state.rejected = false;
      setSessionMainData(state.data);
    })
    .addCase(FETCH_MAIN_DATA.rejected, (state, action) => {
      state.data = null;
      /* istanbul ignore next -- @preserve */
      state.errors = [
        { message: action.error.message || "Data request failed" },
      ];
      state.loading = false;
      state.loaded = false;
      state.rejected = true;
    });
});
