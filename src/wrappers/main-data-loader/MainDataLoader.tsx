import React, { useEffect } from "react";

import { CircularProgress, Grid } from "@mui/material";

import { FETCH_MAIN_DATA } from "@/state/main-data/slice";
import { useAppDispatch, useAppSelector } from "@/state/store";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MainDataLoader = (props: Props) => {
  const { children } = props;

  const dispatch = useAppDispatch();

  const { error, loaded, loading } = useAppSelector((state) => {
    return state.mainData;
  });

  const feedback = (msg: JSX.Element) => {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "50vh" }}
      >
        <Grid item>{msg}</Grid>
      </Grid>
    );
  };

  useEffect(() => {
    if (!loaded && !error && !loading) {
      void dispatch(FETCH_MAIN_DATA());
    }
  }, [dispatch, error, loaded, loading]);

  if (!loaded && !error) {
    return feedback(<CircularProgress data-testid="maindata-spinner" />);
  }

  if (error) {
    return feedback(<h3 data-testid="maindata-failed">😢 {error}</h3>);
  }

  return <>{children}</>;
};
