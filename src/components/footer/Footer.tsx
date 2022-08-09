import { Container } from "@mui/material";
import React from "react";

import useStyles from "./Footer.style";

type IFooter = {
  brand: string;
};

const Footer: React.FC<IFooter> = (props) => {
  const { brand } = props;

  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container>
        <p>© {brand || "Brand"}</p>
      </Container>
    </footer>
  );
};

export default Footer;
