import React, { useEffect } from "react";
import { Button, Card, Container, Grid } from "@mui/material";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

import AppLayout from "../../containers/app-layout";
import useStyles from "./home.style";
import type { AppState } from "../../app/state/store";
import { BASE_CONTENT_URL } from "../../app/const";
import { INIT_DISPLAY_THUMBS } from "../../app/state/home/slice";
import type { InitDisplayThumbsPayload } from "../../app/state/home/slice";
import { useAppDispatch, useAppSelector } from "../../app/state/store";

const Home = () => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const allThumbs = useAppSelector((state: AppState) => {
    return state.mainData.data;
  });

  const displayThumbs = useAppSelector((state: AppState) => {
    return state.home.displayThumbs;
  });

  useEffect(() => {
    if (!displayThumbs && allThumbs.length > 0) {
      const payload: InitDisplayThumbsPayload = { allThumbs };
      dispatch(INIT_DISPLAY_THUMBS(payload));
    }
  }, [allThumbs, displayThumbs, dispatch]);

  let content: ReactNode | ReactNode[] = <div data-testid="home-unset" />;

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
      content = thumbs;
    } else {
      content = (
        <Card className={classes.info} data-testid="home-nothumbs">
          Please make a selection
        </Card>
      );
    }
  }

  return (
    <AppLayout headerNavType="thumbs">
      <Container className={classes.root} data-testid="home-page">
        <Grid container spacing={2} justifyContent="center">
          {content}
        </Grid>
      </Container>
    </AppLayout>
  );
};

export default Home;
