import React, { memo } from "react";
import { Button, Card, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import useStyles from "./home.style";

const HomeThumb = (props: { id: number; url: string; alt: string }) => {
  const { id, url, alt } = props;

  const { classes } = useStyles();

  return (
    <Grid item className={classes.gridItem}>
      <Card elevation={6}>
        <Button
          component={RouterLink}
          to={`/project/${id}`}
          className={classes.gridItemButton}
        >
          <img src={url} alt={alt} />
        </Button>
      </Card>
    </Grid>
  );
};

export default memo(HomeThumb);
