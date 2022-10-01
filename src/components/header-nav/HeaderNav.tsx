import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import HeaderNavDetail from "./HeaderNavDetail";
import HeaderNavThumbs from "./HeaderNavThumbs";
import { BRAND } from "../../app/const";
import { NAV_CHECKBOX_CHANGE } from "../../app/state/home/slice";
import type { NCCPayload } from "../../app/state/home/slice";
import { ThemeWrapperContext } from "../../containers/theme-wrapper/ThemeWrapper";
import { useAppDispatch, useAppSelector } from "../../app/state/store";

type Props = {
  navType: "thumbs" | "detail";
  titleText?: string;
  subtitleText?: string;
};
const HeaderNav = (props: Props) => {
  const { navType, titleText, subtitleText } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const themeWrapperContext = useContext(ThemeWrapperContext);

  const navCheckboxes = useAppSelector((state) => {
    return state.home.nav.checkboxes;
  });

  const mainData = useAppSelector((state) => {
    return state.mainData.data;
  });

  const homeClick = () => {
    navigate("/");
  };

  const brandClick = () => {
    navigate("/about");
  };

  const themeClick = () => {
    themeWrapperContext.toggleTheme();
  };

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.currentTarget;
    const payload: NCCPayload = {
      checkbox: { id, checked },
      allThumbs: mainData,
    };
    dispatch(NAV_CHECKBOX_CHANGE(payload));
  };

  let nav;
  switch (navType) {
    case "thumbs":
      nav = (
        <HeaderNavThumbs
          brandName={BRAND}
          checkboxData={navCheckboxes}
          onBrandClick={brandClick}
          onThemeClick={themeClick}
          onCheckboxChange={checkboxChange}
        />
      );
      break;

    default:
      nav = (
        <HeaderNavDetail
          onHomeClick={homeClick}
          onThemeClick={themeClick}
          titleText={titleText}
          subtitleText={subtitleText}
        />
      );
      break;
  }

  return nav;
};

export default HeaderNav;
