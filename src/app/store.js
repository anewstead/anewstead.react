import { configureStore, createSlice } from '@reduxjs/toolkit';

// ReduxToolKit slice() creates state, actions and reducers in one go
const slice = createSlice({
  name: 'app',
  initialState: {
    hasFirstData: false,
    theme: 'light',
  },
  reducers: {
    setHasFirstData: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.hasFirstData = true;
    },
    toggleTheme: (state, action) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
  },
});

const store = configureStore({
  reducer: {
    app: slice.reducer,
  },
});

export const { setHasFirstData, toggleTheme } = slice.actions;
export default store;
