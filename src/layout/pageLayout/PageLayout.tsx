import React from "react";

import { Box } from "@mui/material";

import { Footer } from "@/components/footer";
import { HeadNav } from "@/layout/headNav";
import { useAppSelector } from "@/state/store";

import css from "./pageLayout.module.scss";

import type { AppState } from "@/state/store";
import type { ReactNode } from "react";

export type PageLayoutProps = {
  headerNavType: "thumbs" | "detail";
  headerNavTitle?: string;
  headerNavSubtitle?: string;
  children?: ReactNode;
};

export const PageLayout = ({
  headerNavType,
  headerNavTitle,
  headerNavSubtitle,
  children,
}: PageLayoutProps) => {
  const mainData = useAppSelector((state: AppState) => {
    return state.mainData.data;
  });

  const brand = mainData?.global?.brand ?? "";

  return (
    <Box className={css["page-layout"]} data-testid="app-layout">
      <HeadNav
        navType={headerNavType}
        titleText={headerNavTitle}
        subtitleText={headerNavSubtitle}
      />

      <main>{children}</main>

      <Footer brand={brand} />
    </Box>
  );
};
