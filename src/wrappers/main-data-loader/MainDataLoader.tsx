import React, { useEffect } from "react";
import { CircularProgress, Grid } from "@mui/material";
import type { ReactNode } from "react";

import { FETCH_MAIN_DATA } from "../../state/main-data/slice";
import { useAppDispatch, useAppSelector } from "../../state/store";

type Props = {
  children: ReactNode;
};

const MainDataLoader = (props: Props) => {
  const { children } = props;

  const dispatch = useAppDispatch();

  const { data, error, loaded, loading } = useAppSelector((state) => {
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
    if (!loading && !loaded && !error) {
      dispatch(FETCH_MAIN_DATA());
    }
  }, [dispatch, error, loaded, loading]);

  return (
    <>
      {loading && feedback(<CircularProgress data-testid="maindata-spinner" />)}

      {error &&
        feedback(
          <h3 data-testid="maindata-failed">Failed to load site data 😢</h3>
        )}

      {data.length > 0 && children}

      {loaded &&
        data.length <= 0 &&
        feedback(
          <h3 data-testid="maindata-empty">Server returned empty data 😢</h3>
        )}
    </>
  );
};

export default MainDataLoader;
