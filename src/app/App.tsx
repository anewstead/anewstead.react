import { CircularProgress, CssBaseline, Grid } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./Routes";
import { FETCH_MAIN_DATA, useAppDispatch, useAppSelector } from "./store";
import { IRootState } from "./store/types";
import themes from "./themes";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state: IRootState) => {
    return state.app.theme;
  });

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
    const url = `${baseContentURL}.netlify/functions/projects`;
    dispatch(FETCH_MAIN_DATA(url));
  }, [dispatch, baseContentURL]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes[theme]}>
        <CssBaseline />
        <BrowserRouter>{display}</BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
