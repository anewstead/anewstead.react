import { Button, Card, Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
    gridItemButton: {
      padding: 0,
    },
    info: {
      padding: theme.spacing(4),
    },
  };
});

const Home = (props) => {
  const classes = useStyles();

  const mainData = useSelector((state) => {
    return state.app.mainData;
  });

  const baseContentURL = useSelector((state) => {
    return state.app.baseContentURL;
  });

  const checkboxes = useSelector((state) => {
    return state.app.nav.checkboxes;
  });

  const showSites = checkboxes.find((obj) => {
    return obj.id === "site";
  }).checked;

  const showApps = checkboxes.find((obj) => {
    return obj.id === "app";
  }).checked;

  const showAds = checkboxes.find((obj) => {
    return obj.id === "banner";
  }).checked;

  const displayData = mainData
    .filter((obj) => {
      return (
        (showSites && obj.type === "site") ||
        (showApps && obj.type === "app") ||
        (showAds && obj.type === "banner")
      );
    })
    .sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });

  let content = displayData.length ? (
    displayData.map((obj, i) => {
      const url = `${baseContentURL}img/thumbs/${obj.thumb}`;
      const alt = `${obj.client} - ${obj.brand} - ${obj.project}`;
      return (
        <Grid item key={i} className={classes.gridItem}>
          <Card elevation={6}>
            <Link
              component={Button}
              to={`/project/${obj.id}`}
              className={classes.gridItemButton}
            >
              <img src={url} alt={alt} />
            </Link>
          </Card>
        </Grid>
      );
    })
  ) : (
    <Card className={classes.info}>Please make a selection</Card>
  );

  return (
    <Container className={classes.root}>
      <Grid container spacing={2} justify="center">
        {/* CONTENT */}
        {content}
      </Grid>
    </Container>
  );
};

export default Layout(Home);
