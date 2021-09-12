import { Button, Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import { RouteComponentProps, Link as RouterLink } from "react-router-dom";

import useStyles from "./no-match.style";

type INoMatch = RouteComponentProps;

const NoMatch: React.FC<INoMatch> = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h3">404 - Page Not Found</Typography>
        <Typography variant="h4">
          <code>{props.location.pathname}</code>
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
  );
};

export default NoMatch;
