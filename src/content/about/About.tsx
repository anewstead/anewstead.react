import React from "react";

import { Container, Paper, Typography } from "@mui/material";
import DOMPurify from "dompurify";
import Markdown from "markdown-to-jsx";

import { BRAND } from "../../const";
import PageLayout from "../../layout/page-layout";
import { useAppSelector } from "../../state/store";

import cls from "./about.module.scss";

import type { AppState } from "../../state/store";

const About = () => {
  const pageData = useAppSelector((state: AppState) => {
    return state.mainData.data!.page!;
  });

  return (
    <PageLayout headerNavType="detail" headerNavTitle={BRAND}>
      <Container className={cls.about} data-testid="about-page">
        <Paper className={cls.paper}>
          <Typography variant="h4" component="h2">
            {pageData?.title}
          </Typography>
          <Markdown>{DOMPurify.sanitize(pageData.info1)}</Markdown>
        </Paper>
      </Container>
    </PageLayout>
  );
};

export default About;
