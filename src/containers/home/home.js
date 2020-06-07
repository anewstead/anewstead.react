import { Card, Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import Layout from "../app/withLayout";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(3),
    },
    gridItem: {
      "& img": {
        width: 80,
        height: 80,
        [theme.breakpoints.up("sm")]: {
          width: 128,
          height: 128,
        },
      },
    },
  };
});

const Home = () => {
  const classes = useStyles();

  const mainData = useSelector((state) => {
    return state.app.mainData;
  });

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const thumbs = mainData
    .map((obj, i) => {
      const url = `${baseContentURL}img/thumbs/${obj.thumb}`;
      const alt = `${obj.client} - ${obj.brand} - ${obj.project}`;
      return (
        <Grid item key={i} className={classes.gridItem}>
          <Card elevation={6}>
            <img src={url} alt={alt} />
          </Card>
        </Grid>
      );
    })
    .reverse();

  return (
    <Container className={classes.root}>
      <Grid container spacing={2} justify="center">
        {thumbs}
      </Grid>
    </Container>
  );
};

export default Layout(Home);
