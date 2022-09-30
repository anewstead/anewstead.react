/**
 * ThemeProvider cannot go at _app level as requires a value from redux
 * i.e can only consume redux below the class that sets the redux provider
 * note however that the EmotionCacheProvider must still be at _app level
 */

import React, { useEffect } from "react";
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import type { ReactNode } from "react";

import theme from "../../app/theme/theme";
import type { AppState } from "../../app/state/store";
import { INIT_THEME } from "../../app/state/theme/slice";
import { useAppDispatch, useAppSelector } from "../../app/state/store";

type Props = {
  children: ReactNode;
};

const ThemeWrapper = (props: Props) => {
  const { children } = props;

  const dispatch = useAppDispatch();

  const themeName = useAppSelector((state: AppState) => {
    return state.theme.themeName;
  });

  useEffect(() => {
    dispatch(INIT_THEME());
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme[themeName]}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeWrapper;
