import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import Footer from "../components/footer";
import HeaderNav from "./header-nav";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      /*
      mobile height bug fix:
      100vh on mobile pushes page bottom/footer too low
      -webkit-fill-available doesn't work for short pages in chrome desktop
      solution: all containing elements leading to our app must have height 100%
      html > body > root (> app)
      our app then uses min-height so is responsible for overflow scroll
      on mobile we need to set min-height 100.1%
      so any short pages can still be pulled-to-refresh in chrome mobile
      */
      minHeight: "100.1%",
      [theme.breakpoints.up("sm")]: {
        minHeight: "100%",
      },

      minWidth: "320px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    main: {
      flexGrow: 1,
      display: "flex",
    },
  };
});

const PageLayout = (props) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  const classes = useStyles();

  const navBrand = useSelector((state) => {
    return state.app.nav.brand;
  });

  return (
    <Box className={classes.root}>
      <HeaderNav
        navType={headerNavType}
        titleText={headerNavTitle}
        subtitleText={headerNavSubtitle}
      />
      <main className={classes.main}>
        {/* DISPLAY */}
        {children}
      </main>
      <Footer brand={navBrand} />
    </Box>
  );
};

export default PageLayout;
