import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";

import AppLayout from "../../containers/app-layout";
import useStyles from "./about.style";
import type { RootState } from "../../app/state/store";
import { useAppSelector } from "../../app/state/store";

const About: React.FC = () => {
  const { classes } = useStyles();

  const brand = useAppSelector((state: RootState) => {
    return state.home.nav.brand;
  });

  return (
    <AppLayout headerNavType="detail" headerNavTitle={brand.toUpperCase()}>
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h2">
            About
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            component={Box}
            align="justify"
          >
            <p>Frontend/UI/UX developer with over 20 years experience.</p>
            <p>
              This portfolio shows some of the productions I have been involved
              with over the years as sole or lead developer or with significant
              hands-on input as a senior team member.
            </p>
            <p>
              This site was written in TypeScript (JavaScript), React and Redux
              (hooks) as a single page application, using Material-UI
              components. <br />
              You are welcome to view the source code at this{" "}
              <a
                href="https://github.com/anewstead/anewstead.cra-mui"
                target="_blank"
                rel="noopener noreferrer"
              >
                Git repository
              </a>
              .
            </p>
          </Typography>
        </Paper>
      </Container>
    </AppLayout>
  );
};

export default About;
