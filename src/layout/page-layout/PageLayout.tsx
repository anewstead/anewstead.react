import React from "react";
import { Box } from "@mui/material";
import type { ReactNode } from "react";

import Footer from "../../components/footer";
import HeaderNav from "../../components/head-nav";
import cls from "./pageLayout.module.scss";
import { BRAND } from "../../const";

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
      <div className={cls.header}>
        <HeaderNav
          navType={headerNavType}
          titleText={headerNavTitle}
          subtitleText={headerNavSubtitle}
        />
      </div>

      <main className={cls.main}>{children}</main>

      <div className={cls.footer}>
        <Footer brand={BRAND} />
      </div>
    </Box>
  );
};

export default PageLayout;
