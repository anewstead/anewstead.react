import { createSlice } from "@reduxjs/toolkit";

import { thumbHelper } from "./helpers";
import { initialState } from "./state";

import type { IMainData } from "../main-data/state";
import type { PayloadAction } from "@reduxjs/toolkit";

export type InitDisplayThumbsPayload = {
  allThumbs: IMainData[];
};

export type NavCheckboxChangePayload = {
  checkbox: { id: string; checked: boolean };
  allThumbs: IMainData[];
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
        action.payload.allThumbs,
        state.nav.checkboxes
      );
    },

    NAV_CHECKBOX_CHANGE: (
      state,
      action: PayloadAction<NavCheckboxChangePayload>
    ) => {
      const { id, checked } = action.payload.checkbox;
      const stateCheckbox = state.nav.checkboxes.find((cb) => {
        return cb.id === id;
      });
      if (!stateCheckbox) {
        throw new Error(`home state does not contain checkbox with id: ${id}`);
      } else {
        stateCheckbox.checked = checked; // creates 2 way bind
      }
      state.displayThumbs = thumbHelper(
        action.payload.allThumbs,
        state.nav.checkboxes
      );
    },
  },
});

export const { INIT_DISPLAY_THUMBS, NAV_CHECKBOX_CHANGE } = slice.actions;

export const homeReducer = slice.reducer;
