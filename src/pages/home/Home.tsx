import { Button, Card, Container, Grid } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useAppSelector } from "../../app/store";
import { IRootState } from "../../app/store/types";
import PageLayout from "../../containers/page-layout";
import useStyles from "./Home.style";

const Home: React.FC = () => {
  const { classes } = useStyles();

  const displayThumbs = useAppSelector((state: IRootState) => {
    return state.app.displayThumbs;
  });

  const baseContentURL = useAppSelector((state: IRootState) => {
    return state.app.baseContentURL;
  });

  let content = <></>;

  if (displayThumbs) {
    if (displayThumbs.length) {
      const thumbs = displayThumbs.map((obj, i) => {
        const url = `${baseContentURL}/img/thumbs/${obj.thumb}`;
        const alt = `${obj.client} - ${obj.brand} - ${obj.project}`;
        return (
          <Grid item key={i} className={classes.gridItem}>
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
      content = <>{thumbs}</>;
    } else {
      content = <Card className={classes.info}>Please make a selection</Card>;
    }
  }

  return (
    <PageLayout headerNavType="thumbs">
      <Container className={classes.root}>
        <Grid container spacing={2} justifyContent="center">
          {content}
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default Home;
