import React from "react";
import { Button, Card, Container, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import AppLayout from "../../containers/app-layout";
import useStyles from "./home.style";
import { IRootState } from "../../app/state/types";
import { useAppSelector } from "../../app/state/redux";

const Home: React.FC = () => {
  const { classes } = useStyles();

  const displayThumbs = useAppSelector((state: IRootState) => {
    return state.app.displayThumbs;
  });

  const baseContentURL = useAppSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

  let content = <></>;

  if (displayThumbs) {
    if (displayThumbs.length) {
      const thumbs = displayThumbs.map((obj) => {
        const url = `${baseContentURL}/img/thumbs/${obj.thumb}`;
        const alt = `${obj.client} - ${obj.brand} - ${obj.project}`;
        return (
          <Grid item key={obj.id} className={classes.gridItem}>
            <Card elevation={6}>
              <Button
                component={RouterLink}
                to={`/project/${obj.id}`}
                className={classes.gridItemButton}
              >
                <img src={url} alt={alt} />
              </Button>
            </Card>
          </Grid>
        );
      });
      content = <>{thumbs}</>;
    } else {
      content = <Card className={classes.info}>Please make a selection</Card>;
    }
  }

  return (
    <AppLayout headerNavType="thumbs">
      <Container className={classes.root}>
        <Grid container spacing={2} justifyContent="center">
          {content}
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default Home;
