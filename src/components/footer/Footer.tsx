import React from "react";

import { Container } from "@mui/material";

import classes from "./footer.module.scss";

export type FooterProps = {
  brand: string;
};

export const Footer = ({ brand }: FooterProps) => {
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
