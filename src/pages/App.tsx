// global css import
import "slick-carousel/slick/slick.css";

import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress, Grid } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

import AppRoutes from "./AppRoutes";
import ThemeWrapper from "../containers/theme-wrapper";
import {
  FETCH_MAIN_DATA,
  INIT_THEME,
  useAppDispatch,
  useAppSelector,
} from "../app/state/redux";
import { IRootState } from "../app/state/types";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const baseContentURL = useAppSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

  const mainData = useAppSelector((state: IRootState) => {
    return state.app.mainData;
  });

  const mainDataLoadFail = useAppSelector((state: IRootState) => {
    return state.app.mainDataLoadFail;
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

  let display = feedback(<CircularProgress />);

  if (mainDataLoadFail) {
    display = feedback(
      <h3>
        Failed to load site data{" "}
        <span role="img" aria-label="crying emoji">
          😢
        </span>
      </h3>
    );
  } else if (mainData) {
    display = <AppRoutes />;
  }

  useEffect(() => {
    dispatch(INIT_THEME());
  }, [dispatch]);

  useEffect(() => {
    const url = `${baseContentURL}.netlify/functions/projects`;
    dispatch(FETCH_MAIN_DATA(url));
  }, [dispatch, baseContentURL]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeWrapper>
        <BrowserRouter>{display}</BrowserRouter>
      </ThemeWrapper>
    </StyledEngineProvider>
  );
};

export default App;
