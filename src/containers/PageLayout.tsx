import { Box } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import Footer from "../components/Footer";
import { IRootState } from "../lib/Store";
import HeaderNav from "./HeaderNav";
import useStyles from "./PageLayout.style";

type IPageLayout = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
};

const PageLayout: React.FC<IPageLayout> = (props) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  const classes = useStyles();

  const navBrand = useSelector((state: IRootState) => {
    return state.app.nav.brand;
  });

  return (
    <Box className={classes.root}>
      <HeaderNav
        navType={headerNavType}
        titleText={headerNavTitle}
        subtitleText={headerNavSubtitle}
      />
      <main className={classes.main}>{children}</main>
      <Footer brand={navBrand} />
    </Box>
  );
};

export default PageLayout;
