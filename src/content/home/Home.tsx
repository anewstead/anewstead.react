import React, { useMemo } from "react";

import { Card, Container, Grid } from "@mui/material";

import { PageLayout } from "@/layout/pageLayout";
import { thumbHelper } from "@/state/home/helpers";
import { useAppSelector } from "@/state/store";

import css from "./home.module.scss";
import { HomeThumb } from "./HomeThumb";

import type { AppState } from "@/state/store";
import type { ReactNode } from "react";

export const Home = () => {
  const projects = useAppSelector((state: AppState) => {
    return state.mainData.data!.projects;
  });

  const navCheckState = useAppSelector((state: AppState) => {
    return state.home.nav.checkboxes;
  });

  // displayThumbs is derivied,
  // so in current data structure is not needed in redux.
  // https://redux.js.org/usage/deriving-data-selectors
  const displayThumbs = useMemo(() => {
    return thumbHelper(projects, navCheckState);
  }, [projects, navCheckState]);

  let content: ReactNode | ReactNode[] = <div data-testid="home-unset" />;

  if (displayThumbs) {
    if (displayThumbs.length) {
      const thumbs = displayThumbs.map((obj) => {
        const alt = `${obj.agency} - ${obj.brand} - ${obj.title}`;
        return (
          <HomeThumb key={obj.uid} id={obj.uid} url={obj.thumb.url} alt={alt} />
        );
      });
      content = thumbs;
    } else {
      content = (
        <Card className={css.info} data-testid="home-nothumbs">
          Please make a selection
        </Card>
      );
    }
  }

  return (
    <PageLayout headerNavType="thumbs">
      <Container className={css.home} data-testid="home-page">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          data-testid="home-thumbs"
        >
          {content}
        </Grid>
      </Container>
    </PageLayout>
  );
};
