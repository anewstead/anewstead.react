import {
  Button,
  Container,
  Paper,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4),
    },
    button: {
      marginTop: theme.spacing(4),
      border: `solid 1px ${theme.palette.text.primary}`,
    },
  };
});
const NoMatch = (props) => {
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
