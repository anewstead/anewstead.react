import React from "react";
import { useNavigate } from "react-router-dom";

import HeaderNavDetail from "./HeaderNavDetail";
import HeaderNavThumbs from "./HeaderNavThumbs";
import { IRootState } from "../../app/state/types";
import {
  NAV_CHECKBOX_CHANGE,
  TOGGLE_THEME,
  useAppDispatch,
  useAppSelector,
} from "../../app/state/redux";

export type IHeaderNav = {
  navType: "thumbs" | "detail";
  titleText?: string;
  subtitleText?: string;
};
const HeaderNav: React.FC<IHeaderNav> = (props) => {
  const { navType, titleText, subtitleText } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navBrand = useAppSelector((state: IRootState) => {
    return state.app.nav.brand;
  });

  const navCheckboxes = useAppSelector((state: IRootState) => {
    return state.app.nav.checkboxes;
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
    const payload = {
      id: e.currentTarget.id,
      checked: e.currentTarget.checked,
    };
    dispatch(NAV_CHECKBOX_CHANGE(payload));
  };

  let nav;
  switch (navType) {
    case "thumbs":
      nav = (
        <HeaderNavThumbs
          brandName={navBrand}
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
