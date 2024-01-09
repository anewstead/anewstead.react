import React from "react";

import { Button, Container, Paper, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { PageLayout } from "@/layout/page-layout";

import css from "./noMatch.module.scss";

export const NoMatch = () => {
  const location = useLocation();

  return (
    <PageLayout headerNavType="detail">
      <Container className={css["no-match"]} data-testid="nomatch-page">
        <Paper className={css.paper}>
          <Typography variant="h3">404 - Page Not Found</Typography>
          <Typography variant="h4">
            <code>{location.pathname}</code>
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            className={css.button}
            size="large"
          >
            Go to Homepage
          </Button>
        </Paper>
      </Container>
    </PageLayout>
  );
};
