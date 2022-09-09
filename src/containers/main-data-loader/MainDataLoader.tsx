import React, { useEffect } from "react";
import { CircularProgress, Grid } from "@mui/material";

import { FETCH_MAIN_DATA } from "../../app/state/slice/mainData";
import { INIT_DISPLAY_THUMBS } from "../../app/state/slice/home";
import { MAIN_DATA_URL } from "../../app/constants";
import { useAppDispatch, useAppSelector } from "../../app/state/store";

type Props = {
  children: React.ReactNode;
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
    dispatch(FETCH_MAIN_DATA(MAIN_DATA_URL)).then((res) => {
      const payload = { mainData: res.payload };
      dispatch(INIT_DISPLAY_THUMBS(payload));
    });
  }, [dispatch]);

  return (
    <>
      {loading && feedback(<CircularProgress />)}

      {error && feedback(<h3>Failed to load site data 😢</h3>)}

      {data.length && children}

      {loaded &&
        !data.length &&
        feedback(<h3>Server returned an empty data 😢</h3>)}
    </>
  );
};

export default MainDataLoader;
