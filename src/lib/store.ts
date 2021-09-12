import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import { thumbHelper } from "./store.helpers";
import { IState } from "./store.types";
import { detectColorTheme, toggleColorTheme } from "./themes";

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

const initialState: IState = {
  baseContentURL: "https://anewstead-content.netlify.app/",
  mainData: [],
  mainDataLoadFail: false,
  displayThumbs: [],
  theme: detectColorTheme(),
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

// ReduxToolKit createSlice() creates state, actions and reducers from one object
// remember to export reducer functions as slice.actions
const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    TOGGLE_THEME: (state) => {
      state.theme = toggleColorTheme();
    },
    NAV_CHECKBOX_CHANGE: (state, action) => {
      const checkbox = state.nav.checkboxes.find((obj) => {
        return obj.id === action.payload.id;
      });
      if (!checkbox) {
        throw new Error(`store: cannot find checkbox: ${action.payload.id}`);
      } else {
        checkbox.checked = action.payload.checked; //2 way bind
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export const { TOGGLE_THEME, NAV_CHECKBOX_CHANGE } = slice.actions;
export default store;
