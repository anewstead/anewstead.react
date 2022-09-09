import type { TypedUseSelectorHook } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import home from "./slice/home";
import mainData from "./slice/mainData";
import theme from "./slice/theme";

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed versions, Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * MAINTAIN NAMESPACES
 * reducer values entered here should be the same as filename from "slice" folder that default exports a reducer
 * e.g. "slice/theme.ts" > "default export slice.reducers" > so import "theme" here
 * note. if you use createSlice() (instead of createAction/createReducer)
 * the slice.name should also be the same as its filename
 */
const store = configureStore({
  reducer: {
    home,
    mainData,
    theme,
  },
});

export default store;
