import { Box, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import { onAppStartup } from "./store";
import themes from "./themes";

const AppWrapper = styled(Box)({
  height: "100vh",
  minWidth: "320px",
});

const App = () => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => {
    return state.app.theme;
  });

  useEffect(() => {
    dispatch(onAppStartup());
  }, [dispatch]);

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <AppWrapper>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AppWrapper>
    </ThemeProvider>
  );
};

export default App;
