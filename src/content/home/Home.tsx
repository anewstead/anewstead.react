import React, { useEffect } from "react";

import { Card, Container, Grid } from "@mui/material";

import { PageLayout } from "@/layout/page-layout";
import { INIT_DISPLAY_THUMBS } from "@/state/home/slice";
import { useAppDispatch, useAppSelector } from "@/state/store";

import cls from "./home.module.scss";
import { HomeThumb } from "./HomeThumb";

import type { InitDisplayThumbsPayload } from "@/state/home/slice";
import type { AppState } from "@/state/store";
import type { ReactNode } from "react";

export const Home = () => {
  const dispatch = useAppDispatch();

  const projects = useAppSelector((state: AppState) => {
    return state.mainData.data!.projects;
  });

  const displayThumbs = useAppSelector((state: AppState) => {
    return state.home.displayThumbs;
  });

  useEffect(() => {
    if (!displayThumbs && projects?.length > 0) {
      const payload: InitDisplayThumbsPayload = { projects };
      dispatch(INIT_DISPLAY_THUMBS(payload));
    }
  }, [projects, displayThumbs, dispatch]);

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
