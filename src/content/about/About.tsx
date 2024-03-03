import React from "react";

import { Container, Paper, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import Markdown from "markdown-to-jsx";

import { PageLayout } from "@/layout/pageLayout";
import { useAppSelector } from "@/state/store";

import css from "./about.module.scss";

import type { AppState } from "@/state/store";

export const About = () => {
  const mainData = useAppSelector((state: AppState) => {
    return state.mainData.data;
  });

  /* istanbul ignore next -- @preserve */
  const info = mainData?.page?.info1 ?? "";

  return (
    <PageLayout headerNavType="detail" headerNavTitle={mainData?.global?.brand}>
      <Container className={css.about} data-testid="about-page">
        <Paper className={css.paper}>
          <Typography variant="h4" component="h2">
            {mainData?.page?.title}
          </Typography>
          <Markdown>{DOMPurify.sanitize(info)}</Markdown>
        </Paper>
      </Container>
    </PageLayout>
  );
};
