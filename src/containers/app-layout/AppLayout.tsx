import React from "react";
import { Box } from "@mui/material";

import Footer from "../../components/footer";
import HeaderNav from "../../components/header-nav";
import useStyles from "./appLayout.style";
import type { RootState } from "../../app/state/store";
import { useAppSelector } from "../../app/state/store";

type IPageLayout = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
  children?: React.ReactNode;
};
// TODO: this maybe better as a HOC
const AppLayout: React.FC<IPageLayout> = (props) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  const { classes } = useStyles();

  const navBrand = useAppSelector((state: RootState) => {
    return state.home.nav.brand;
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

export default AppLayout;
