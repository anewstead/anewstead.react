import { Button, Card, Container, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import PageLayout from "../containers/PageLayout";
import { IRootState } from "../lib/Store";
import useStyles from "./Home.style";

const Home: React.FC = () => {
  const classes = useStyles();

  const displayThumbs = useSelector((state: IRootState) => {
    return state.app.displayThumbs;
  });

  const baseContentURL = useSelector((state: IRootState) => {
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
