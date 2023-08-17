import React, { memo } from "react";

import { Button, Card, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import cls from "./home.module.scss";

const HomeThumb = (props: { id: number; url: string; alt: string }) => {
  const { id, url, alt } = props;

  return (
    <Grid item className={cls["grid-item"]}>
      <Card elevation={6}>
        <Button
          component={RouterLink}
          to={`/project/${id}`}
          className={cls["grid-item-button"]}
        >
          <img src={url} alt={alt} />
        </Button>
      </Card>
    </Grid>
  );
};

export default memo(HomeThumb);
