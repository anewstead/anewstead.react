import React, { useEffect } from "react";

import { CircularProgress, Grid } from "@mui/material";

import { FETCH_MAIN_DATA } from "../../state/main-data/slice";
import { useAppDispatch, useAppSelector } from "../../state/store";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainDataLoader = (props: Props) => {
  const { children } = props;

  const dispatch = useAppDispatch();

  const { errors, loaded, loading, rejected } = useAppSelector((state) => {
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
    if (!loaded && !rejected && !loading) {
      dispatch(FETCH_MAIN_DATA());
    }
  }, [dispatch, rejected, loaded, loading]);

  if (!loaded && !rejected) {
    return feedback(<CircularProgress data-testid="maindata-spinner" />);
  }

  if (rejected || errors) {
    return feedback(
      <h3 data-testid="maindata-failed">😢 {errors![0].message}</h3>
    );
  }

  return <>{children}</>;
};

export default MainDataLoader;
