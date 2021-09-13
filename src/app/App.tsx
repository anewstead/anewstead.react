import { CircularProgress, CssBaseline, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import { FETCH_MAIN_DATA } from "./store";
import { IRootState } from "./store/types";
import themes from "./themes";

const App: React.FC = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state: IRootState) => {
    return state.app.theme;
  });

  const baseContentURL = useSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

  const mainData = useSelector((state: IRootState) => {
    return state.app.mainData;
  });

  const mainDataLoadFail = useSelector((state: IRootState) => {
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
    display = <Routes />;
  }

  useEffect(() => {
    const url = `${baseContentURL}.netlify/functions/projects`;
    dispatch(FETCH_MAIN_DATA(url));
  }, [dispatch, baseContentURL]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <BrowserRouter>{display}</BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
