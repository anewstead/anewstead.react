import React from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

import PageLayout from "../../containers/page-layout";
import useStyles from "./NoMatch.style";

const NoMatch: React.FC = () => {
  const { classes } = useStyles();
  const location = useLocation();

  return (
    <PageLayout headerNavType="detail">
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
    </PageLayout>
  );
};

export default NoMatch;
