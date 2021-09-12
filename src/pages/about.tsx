import { Container, Paper, Typography } from "@material-ui/core";
import React from "react";

import PageLayout from "../containers/PageLayout";
import useStyles from "./About.style";

const About: React.FC = () => {
  const classes = useStyles();

  return (
    <PageLayout headerNavType="detail">
      <Container className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h4" component="h2">
            About
          </Typography>

          <Typography
            variant="body2"
            gutterBottom
            component="div"
            align="justify"
          >
            <p>Frontend/UI/UX developer with over 20 years experience.</p>
            <p>
              This portfolio shows some of the productions I have been involved
              with over the years as sole or lead developer or with significant
              hands-on input as a senior team member.
            </p>
            <p>
              This site was written in TypeScript, React and Redux (hooks) as a
              single page application. It also makes use of Material-UI
              components although typically commercial work is hand-crafted and
              bespoke built from scratch. <br />
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
    </PageLayout>
  );
};

export default About;
