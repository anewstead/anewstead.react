import React from "react";
import { Button, Card, Container, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import AppLayout from "../../containers/app-layout";
import useStyles from "./home.style";
import { BASE_CONTENT_URL } from "../../app/const";
import { NAV_TYPE } from "../../components/header-nav/HeaderNav";
import type { RootState } from "../../app/state/store";
import { useAppSelector } from "../../app/state/store";

const Home: React.FC = () => {
  const { classes } = useStyles();

  const displayThumbs = useAppSelector((state: RootState) => {
    return state.home.displayThumbs;
  });

  let content = <></>;

  if (displayThumbs) {
    if (displayThumbs.length) {
      const thumbs = displayThumbs.map((obj) => {
        const url = `${BASE_CONTENT_URL}/img/thumbs/${obj.thumb}`;
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
    <AppLayout headerNavType={NAV_TYPE.THUMBS}>
      <Container className={classes.root}>
        <Grid container spacing={2} justifyContent="center">
          {content}
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default Home;
