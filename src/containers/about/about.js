import { Container, Paper, Typography, makeStyles } from "@material-ui/core";
import React from "react";

import Layout from "../app/withLayout";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(4),
    },
  };
});

const About = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h2">About</Typography>
        <Typography gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
          magna sem, imperdiet vel vestibulum id, pretium nec ante. Nulla
          facilisi. Sed rhoncus commodo blandit. Vivamus hendrerit justo vitae
          dictum aliquet. Nullam dictum efficitur libero id congue. Nulla
          hendrerit tortor nec pharetra ornare. Sed interdum ligula vitae quam
          lobortis, ut molestie sem pretium. Nunc lobortis mauris tristique
          gravida sollicitudin. Aliquam tristique ullamcorper consequat. Vivamus
          ac sollicitudin mi. Nunc ut tellus ac lacus ullamcorper ornare in at
          ligula.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Layout(About);
