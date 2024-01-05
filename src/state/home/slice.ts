import { createSlice } from "@reduxjs/toolkit";

import { thumbHelper } from "./helpers";
import { initialState } from "./state";

import type { TNavCheckState } from "@/components/head-nav-thumbs";
import type { FprojectFragment } from "@/services/hygraph/generated/graphql";
import type { PayloadAction } from "@reduxjs/toolkit";

export type InitDisplayThumbsPayload = {
  projects: FprojectFragment[];
};

export type NavCheckboxChangePayload = {
  navCheckState: TNavCheckState;
  projects: FprojectFragment[];
};

const slice = createSlice({
  name: "home",
  initialState,
  reducers: {
    INIT_DISPLAY_THUMBS: (
      state,
      action: PayloadAction<InitDisplayThumbsPayload>
    ) => {
      state.displayThumbs = thumbHelper(
        action.payload.projects,
        state.nav.checkboxes
      );
    },

    NAV_CHECKBOX_CHANGE: (
      state,
      action: PayloadAction<NavCheckboxChangePayload>
    ) => {
      state.nav.checkboxes = action.payload.navCheckState; // sync redux to nav
      state.displayThumbs = thumbHelper(
        action.payload.projects,
        state.nav.checkboxes
      );
    },
  },
});

export const { INIT_DISPLAY_THUMBS, NAV_CHECKBOX_CHANGE } = slice.actions;

export const homeReducer = slice.reducer;
