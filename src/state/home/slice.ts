import { createSlice } from "@reduxjs/toolkit";

import { initialState } from "./state";

import type { TNavCheckState } from "@/components/headNavThumbs";
import type { PayloadAction } from "@reduxjs/toolkit";

export type NavCheckboxChangePayload = {
  navCheckState: TNavCheckState;
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    NAV_CHECKBOX_CHANGE: (
      state,
      action: PayloadAction<NavCheckboxChangePayload>
    ) => {
      state.nav.checkboxes = action.payload.navCheckState; // sync redux to nav
    },
  },
});

export const { NAV_CHECKBOX_CHANGE } = slice.actions;

export const homeReducer = slice.reducer;
export const homeSelectors = slice.selectors;
