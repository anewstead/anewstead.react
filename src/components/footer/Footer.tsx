import React from "react";
import { Container } from "@mui/material";

import useStyles from "./footer.style";

type IFooter = {
  brand: string;
};

const Footer: React.FC<IFooter> = (props) => {
  const { brand } = props;

  const { classes } = useStyles();
  const text = `© ${brand || "Brand"} ${new Date().getFullYear()}`;
  return (
    <footer className={classes.footer}>
      <Container>
        <p>{text}</p>
      </Container>
    </footer>
  );
};

export default Footer;
