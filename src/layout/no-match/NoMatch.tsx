import React from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

import AppWrapper from "../../wrappers/app-wrapper";
import useStyles from "./noMatch.style";

const NoMatch = () => {
  const { classes } = useStyles();
  const location = useLocation();

  return (
    <AppWrapper headerNavType="detail">
      <Container className={classes.root} data-testid="nomatch-page">
        <Paper className={classes.paper}>
          <Typography variant="h3">404 - Page Not Found</Typography>
          <Typography variant="h4">
            <code>{location.pathname}</code>
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            className={classes.button}
            size="large"
          >
            Go to Homepage
          </Button>
        </Paper>
      </Container>
    </AppWrapper>
  );
};

export default NoMatch;
