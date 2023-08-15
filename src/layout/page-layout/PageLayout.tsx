import React from "react";

import { Box } from "@mui/material";

import Footer from "../../components/footer";
import HeaderNav from "../../components/head-nav";
import { BRAND } from "../../const";

import cls from "./pageLayout.module.scss";

import type { ReactNode } from "react";

type Props = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
  children?: ReactNode;
};

const PageLayout = (props: Props) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  return (
    <Box className={cls["page-layout"]} data-testid="app-layout">
      <HeaderNav
        navType={headerNavType}
        titleText={headerNavTitle}
        subtitleText={headerNavSubtitle}
      />

      <main>{children}</main>

      <Footer brand={BRAND} />
    </Box>
  );
};

export default PageLayout;
