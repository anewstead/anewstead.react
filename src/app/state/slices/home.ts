import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { ICheckbox, IMainData } from "../types";
import { thumbHelper } from "../helpers";

type IHomePageState = {
  displayThumbs: IMainData[];
  nav: {
    brand: string;
    checkboxes: ICheckbox[];
  };
};

const initialState: IHomePageState = {
  displayThumbs: [],
  nav: {
    brand: "Andrew Newstead",
    checkboxes: [
      {
        id: "site",
        label: "Websites",
        checked: true,
      },
      {
        id: "app",
        label: "Apps",
        checked: true,
      },
      {
        id: "banner",
        label: "Adverts",
        checked: true,
      },
    ],
  },
};

type IDTPayload = {
  mainData: IMainData[];
};

type NCCPayload = {
  checkbox: { id: string; checked: boolean };
  mainData: IMainData[];
};

const slice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    INIT_DISPLAY_THUMBS: (state, action: PayloadAction<IDTPayload>) => {
      state.displayThumbs = thumbHelper(
        action.payload.mainData,
        state.nav.checkboxes
      );
    },

    NAV_CHECKBOX_CHANGE: (state, action: PayloadAction<NCCPayload>) => {
      const { id, checked } = action.payload.checkbox;
      const stateCheckbox = state.nav.checkboxes.find((cb) => {
        return cb.id === id;
      });
      if (!stateCheckbox) {
        throw new Error(`store: cannot find checkbox: ${id}`);
      } else {
        stateCheckbox.checked = checked; // creates 2 way bind
      }
      state.displayThumbs = thumbHelper(
        action.payload.mainData,
        state.nav.checkboxes
      );
    },
  },
});

export const { INIT_DISPLAY_THUMBS, NAV_CHECKBOX_CHANGE } = slice.actions;

export default slice.reducer;
