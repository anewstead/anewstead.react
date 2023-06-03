import React from "react";
import { Container } from "@mui/material";

import classes from "./footer.module.scss";

type Props = {
  brand: string;
};

const Footer = (props: Props) => {
  const { brand } = props;

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
