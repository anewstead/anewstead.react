import React, { useEffect } from "react";

import { Card, Container, Grid } from "@mui/material";

import PageLayout from "../../layout/page-layout";
import { INIT_DISPLAY_THUMBS } from "../../state/home/slice";
import { useAppDispatch, useAppSelector } from "../../state/store";

import cls from "./home.module.scss";
import HomeThumb from "./HomeThumb";

import type { InitDisplayThumbsPayload } from "../../state/home/slice";
import type { AppState } from "../../state/store";
import type { ReactNode } from "react";

const Home = () => {
  const dispatch = useAppDispatch();

  const allThumbs = useAppSelector((state: AppState) => {
    return state.mainData.data?.projects || [];
  });

  const displayThumbs = useAppSelector((state: AppState) => {
    return state.home.displayThumbs;
  });

  useEffect(() => {
    if (!displayThumbs && allThumbs?.length > 0) {
      const payload: InitDisplayThumbsPayload = { allThumbs };
      dispatch(INIT_DISPLAY_THUMBS(payload));
    }
  }, [allThumbs, displayThumbs, dispatch]);

  let content: ReactNode | ReactNode[] = <div data-testid="home-unset" />;

  if (displayThumbs) {
    if (displayThumbs.length) {
      const thumbs = displayThumbs.map((obj) => {
        const alt = `${obj.agency} - ${obj.brand} - ${obj.title}`;
        return (
          <HomeThumb key={obj.id} id={obj.id} url={obj.thumb.url} alt={alt} />
        );
      });
      content = thumbs;
    } else {
      content = (
        <Card className={cls.info} data-testid="home-nothumbs">
          Please make a selection
        </Card>
      );
    }
  }

  return (
    <PageLayout headerNavType="thumbs">
      <Container className={cls.home} data-testid="home-page">
        <Grid container spacing={2} justifyContent="center">
          {content}
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default Home;
