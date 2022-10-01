// based on:
// https://redux.js.org/usage/writing-tests#example-app-code

import type {
  PreloadedState,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import { homeReducer } from "./home/slice";
import { mainDataReducer } from "./main-data/slice";

const rootReducer = combineReducers({
  home: homeReducer,
  mainData: mainDataReducer,
});

// creates and return a store.
// exported for use in testing so we can create targetted locally scoped store,
// if a reducer is not passed or intentionally set undefined, default rootReducer is used,
// this is so tests can override default to just the reducer(s) that are being tested
// setupStore() = defaults
// setupStore(myreducer) = reducer as rootreducer
// setupStore({myreducer}) = reducer as named slice
// setupStore(undefined, {}) = default rootReducer, empty preloadedState
export const setupStore = (
  reducer?: Reducer | ReducersMapObject,
  preloadedState?: PreloadedState<RootState>
) => {
  return configureStore({
    reducer: reducer || rootReducer,
    preloadedState,
  });
};

// this is THE store at runtime
const store = setupStore();

// Infer types `Appstore` `RootState` and `AppDispatch`
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks. Use throughout app instead of `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
