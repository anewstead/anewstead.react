import React from "react";

import { Box } from "@mui/material";

import Footer from "../../components/footer";
import HeaderNav from "../../components/head-nav";
import { useAppSelector } from "../../state/store";

import cls from "./pageLayout.module.scss";

import type { AppState } from "../../state/store";
import type { ReactNode } from "react";

type Props = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
  children?: ReactNode;
};

const PageLayout = (props: Props) => {
  const { headerNavType, headerNavTitle, headerNavSubtitle, children } = props;

  const mainData = useAppSelector((state: AppState) => {
    return state.mainData.data;
  });

  const brand = mainData?.global?.brand ?? "";

  return (
    <Box className={cls["page-layout"]} data-testid="app-layout">
      <HeaderNav
        navType={headerNavType}
        titleText={headerNavTitle}
        subtitleText={headerNavSubtitle}
      />

      <main>{children}</main>

      <Footer brand={brand} />
    </Box>
  );
};

export default PageLayout;
