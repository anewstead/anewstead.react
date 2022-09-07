import React from "react";
import { Button, Card, Container, Grid } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import PageLayout from "../../containers/page-layout";
import useStyles from "./Home.style";
import { IRootState } from "../../app/store/types";
import { useAppSelector } from "../../app/store";

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
      const thumbs = displayThumbs.map((obj) => {
        const url = `${baseContentURL}/img/thumbs/${obj.thumb}`;
        const alt = `${obj.client} - ${obj.brand} - ${obj.project}`;
        return (
          <Grid item key={obj.id} className={classes.gridItem}>
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
