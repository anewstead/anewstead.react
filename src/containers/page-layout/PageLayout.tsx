import React from "react";
import { Box } from "@mui/material";

import Footer from "../../components/footer";
import HeaderNav from "../../components/header-nav";
import useStyles from "./PageLayout.style";
import { IRootState } from "../../app/store/types";
import { useAppSelector } from "../../app/store";

type IPageLayout = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
  children?: React.ReactNode;
};

const PageLayout: React.FC<IPageLayout> = (props) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  const { classes } = useStyles();

  const navBrand = useAppSelector((state: IRootState) => {
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
