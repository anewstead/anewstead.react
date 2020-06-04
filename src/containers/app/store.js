import { configureStore, createSlice } from "@reduxjs/toolkit";
import { detectColorTheme, toggleColorTheme } from "./themes";

// ReduxToolKit createSlice() creates state, actions and reducers from one object
// remember to export reducer functions as slice.actions
const slice = createSlice({
  name: "app",
  initialState: {
    startup: false,
    theme: detectColorTheme(),
    nav: {
      brand: "BRAND",
      checkboxes: [
        {
          id: "sites",
          label: "Websites",
          checked: true,
        },
        {
          id: "apps",
          label: "Apps",
          checked: true,
        },
        {
          id: "banners",
          label: "Banners",
          checked: true,
        },
      ],
    },
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    onAppStartup: (state, action) => {
      state.startup = true;
    },
    toggleTheme: (state, action) => {
      state.theme = toggleColorTheme();
    },
    navCheckboxChange: (state, action) => {
      const checkbox = state.nav.checkboxes.find((obj) => {
        return obj.id === action.payload.id;
      });
      checkbox.checked = action.payload.checked;
    },
  },
});

const store = configureStore({
  reducer: {
    app: slice.reducer,
  },
});

export const { onAppStartup, toggleTheme, navCheckboxChange } = slice.actions;
export default store;
