import React from "react";
import { Container } from "@mui/material";

import useStyles from "./footer.style";

type Props = {
  brand: string;
};

const Footer = (props: Props) => {
  const { brand } = props;

  const { classes } = useStyles();

  const date = new Date().getFullYear();

  const text = `© ${brand} ${date}`;

  return (
    <footer className={classes.footer}>
      <Container>
        <p>{text}</p>
      </Container>
    </footer>
  );
};

export default Footer;
