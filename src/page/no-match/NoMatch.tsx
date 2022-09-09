import React from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

import AppLayout from "../../containers/app-layout";
import useStyles from "./noMatch.style";
import { NAV_TYPE } from "../../components/header-nav/HeaderNav";

const NoMatch = () => {
  const { classes } = useStyles();
  const location = useLocation();

  return (
    <AppLayout headerNavType={NAV_TYPE.DETAILS}>
      <Container className={classes.root}>
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
    </AppLayout>
  );
};

export default NoMatch;
