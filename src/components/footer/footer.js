import { Container, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      backgroundColor: theme.palette.background.paper,
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
      height: "48px",
    },
  };
});

const Footer = (props) => {
  const { brand } = props;

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container>
        <p>© {brand || "Brand"}</p>
      </Container>
    </footer>
  );
};

export default Footer;
