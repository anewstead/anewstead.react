import React, { memo, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { NAV_CHECKBOX_CHANGE } from "../../state/home/slice";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { useThemeWrapperContext } from "../../wrappers/theme-wrapper/ThemeWrapperContext";
import { HeadNavDetail } from "../head-nav-detail";
import { HeadNavThumbs } from "../head-nav-thumbs";

import type { NavCheckboxChangePayload } from "../../state/home/slice";

type Props = {
  navType: "thumbs" | "detail";
  titleText?: string;
  subtitleText?: string;
};

export const HeadNav = memo((props: Props) => {
  const { navType, titleText, subtitleText } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { toggleTheme } = useThemeWrapperContext();

  const navCheckboxes = useAppSelector((state) => {
    return state.home.nav.checkboxes;
  });

  const projectsData = useAppSelector((state) => {
    return state.mainData.data?.projects ?? [];
  });

  const globalData = useAppSelector((state) => {
    return state.mainData.data?.global;
  });

  const homeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const brandClick = useCallback(() => {
    navigate("/about");
  }, [navigate]);

  const checkboxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, checked } = e.currentTarget;
      const payload: NavCheckboxChangePayload = {
        checkbox: { id, checked },
        projects: projectsData,
      };
      dispatch(NAV_CHECKBOX_CHANGE(payload));
    },
    [dispatch, projectsData]
  );

  const navThumbs = (
    <HeadNavThumbs
      brandName={globalData?.brand}
      checkboxData={navCheckboxes}
      onBrandClick={brandClick}
      onThemeClick={toggleTheme}
      onCheckboxChange={checkboxChange}
    />
  );

  const navDetail = (
    <HeadNavDetail
      onHomeClick={homeClick}
      onThemeClick={toggleTheme}
      titleText={titleText}
      subtitleText={subtitleText}
    />
  );

  return navType === "thumbs" ? navThumbs : navDetail;
});
