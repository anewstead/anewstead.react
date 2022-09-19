import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

import {
  getSessionMainData,
  removeSessionMainData,
  setSessionMainData,
} from "./helpers";
import { initialState } from "./state";
import { loadMainData } from "../../api";

// if session cache return it otherwise load
export const FETCH_MAIN_DATA = createAsyncThunk("FETCH_MAIN_DATA", async () => {
  return getSessionMainData() || loadMainData();
});

export const mainDataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH_MAIN_DATA.pending, (state) => {
      removeSessionMainData();
      state.data = [];
      state.error = false;
      state.loaded = false;
      state.loading = true;
    })
    .addCase(FETCH_MAIN_DATA.fulfilled, (state, action) => {
      setSessionMainData(action.payload);
      state.data = action.payload;
      state.loaded = true;
      state.loading = false;
    })
    .addCase(FETCH_MAIN_DATA.rejected, (state) => {
      state.error = true;
      state.loaded = false;
      state.loading = false;
    });
});
