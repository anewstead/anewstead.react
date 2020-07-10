import { CircularProgress, CssBaseline, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Routes from "../lib/routes";
import { FETCH_MAIN_DATA } from "../lib/store";
import themes from "../lib/themes";

const App = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => {
    return state.app.theme;
  });

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const mainData = useSelector((state) => {
    return state.app.mainData;
  });

  const feedback = (msg) => {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ height: "50vh" }}
      >
        <Grid item>{msg}</Grid>
      </Grid>
    );
  };

  let display = feedback(<CircularProgress />);

  if (mainData === "rejected") {
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
      <BrowserRouter>
        {/* DISPLAY */}
        {display}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
