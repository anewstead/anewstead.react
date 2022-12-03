import React from "react";
import { Box } from "@mui/material";
import type { ReactNode } from "react";

import Footer from "../../components/footer";
import HeaderNav from "../../components/header-nav";
import useStyles from "./appWrapper.style";
import { BRAND } from "../../app/const";

type Props = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
  children?: ReactNode;
};

const AppWrapper = (props: Props) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  const { classes } = useStyles();

  return (
    <Box className={classes.root} data-testid="app-layout">
      <HeaderNav
        navType={headerNavType}
        titleText={headerNavTitle}
        subtitleText={headerNavSubtitle}
      />
      <main className={classes.main}>{children}</main>
      <Footer brand={BRAND} />
    </Box>
  );
};

export default AppWrapper;
