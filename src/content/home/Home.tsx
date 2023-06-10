import React, { useEffect } from "react";
import { Card, Container, Grid } from "@mui/material";
import type { ReactNode } from "react";

import HomeThumb from "./HomeThumb";
import PageLayout from "../../layout/page-layout";
import cls from "./home.module.scss";
import type { AppState } from "../../state/store";
import { BASE_CONTENT_URL } from "../../const";
import { INIT_DISPLAY_THUMBS } from "../../state/home/slice";
import type { InitDisplayThumbsPayload } from "../../state/home/slice";
import { useAppDispatch, useAppSelector } from "../../state/store";

const Home = () => {
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
        return <HomeThumb key={obj.id} id={obj.id} url={url} alt={alt} />;
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
