import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import Footer from "../components/footer";
import HeaderNav from "./header-nav";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      minHeight: "100vh",
      /* mobile viewport bug fix */
      // eslint-disable-next-line no-dupe-keys
      minHeight: "-webkit-fill-available",
      minWidth: "320px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    },
    main: {
      flexGrow: 1,
      display: "flex",
    },
    mainAndFooterWrapper: {
      overflow: "auto",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
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
      <div className={classes.mainAndFooterWrapper}>
        <main className={classes.main}>
          {/* DISPLAY */}
          {children}
        </main>
        <Footer brand={navBrand} />
      </div>
    </Box>
  );
};

export default PageLayout;
