import React, { memo } from "react";

import { Button, Card, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import css from "./home.module.scss";

export type HomeThumbProps = {
  id: string;
  url: string;
  alt: string;
};

export const HomeThumb = memo(({ id, url, alt }: HomeThumbProps) => {
  return (
    <Grid item className={css["grid-item"]}>
      <Card elevation={6}>
        <Button
          component={RouterLink}
          to={`/project/${id}`}
          className={css["grid-item-button"]}
        >
          <img src={url} alt={alt} />
        </Button>
      </Card>
    </Grid>
  );
});
