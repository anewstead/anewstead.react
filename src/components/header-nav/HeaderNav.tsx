import React from "react";
import { useNavigate } from "react-router-dom";

import HeaderNavDetail from "./HeaderNavDetail";
import HeaderNavThumbs from "./HeaderNavThumbs";
import { BRAND } from "../../app/const";
import { NAV_CHECKBOX_CHANGE } from "../../app/state/slice/home";
import { TOGGLE_THEME } from "../../app/state/slice/theme";
import { useAppDispatch, useAppSelector } from "../../app/state/store";

export const NAV_TYPE = {
  THUMBS: "thumbs",
  DETAILS: "details",
};

export type INavType = typeof NAV_TYPE.THUMBS | typeof NAV_TYPE.DETAILS;

export type IHeaderNav = {
  navType: INavType;
  titleText?: string;
  subtitleText?: string;
};
const HeaderNav: React.FC<IHeaderNav> = (props) => {
  const { navType, titleText, subtitleText } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navCheckboxes = useAppSelector((state) => {
    return state.home.nav.checkboxes;
  });

  const mainData = useAppSelector((state) => {
    return state.mainData.data;
  });

  const backClick = () => {
    navigate("/");
  };

  const brandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/about");
  };

  const themeClick = () => {
    dispatch(TOGGLE_THEME());
  };

  const checkboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.currentTarget;
    const payload = {
      checkbox: { id, checked },
      allThumbs: mainData,
    };
    dispatch(NAV_CHECKBOX_CHANGE(payload));
  };

  let nav;
  switch (navType) {
    case NAV_TYPE.THUMBS:
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
          onBackClick={backClick}
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
