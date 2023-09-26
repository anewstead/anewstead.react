import { createSlice } from "@reduxjs/toolkit";

import { thumbHelper } from "./helpers";
import { initialState } from "./state";

import type { FprojectFragment } from "../../services/hygraph/generated/graphql";
import type { PayloadAction } from "@reduxjs/toolkit";

export type InitDisplayThumbsPayload = {
  projects: FprojectFragment[];
};

export type NavCheckboxChangePayload = {
  checkbox: { id: string; checked: boolean };
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
      const { id, checked } = action.payload.checkbox;
      const stateCheckbox = state.nav.checkboxes.find((cb) => {
        return cb.id.toString() === id;
      });
      if (!stateCheckbox) {
        throw new Error(`home state does not contain checkbox with id: ${id}`);
      } else {
        stateCheckbox.checked = checked; // creates 2 way bind
      }
      state.displayThumbs = thumbHelper(
        action.payload.projects,
        state.nav.checkboxes
      );
    },
  },
});

export const { INIT_DISPLAY_THUMBS, NAV_CHECKBOX_CHANGE } = slice.actions;

export const homeReducer = slice.reducer;
