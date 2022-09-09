import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

import type { IMainData } from "../types";

export const FETCH_MAIN_DATA = createAsyncThunk(
  "FETCH_MAIN_DATA",
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

type IFetchMainDataState = {
  loading: Boolean;
  loaded: Boolean;
  error: Boolean;
  data: IMainData[];
};

const initialState: IFetchMainDataState = {
  loading: false,
  loaded: false,
  error: false,
  data: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(FETCH_MAIN_DATA.pending, (state) => {
      state.data = [];
      state.loaded = false;
      state.loading = true;
    })
    .addCase(FETCH_MAIN_DATA.fulfilled, (state, action) => {
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

export default reducer;
