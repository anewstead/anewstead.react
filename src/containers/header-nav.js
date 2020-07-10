import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import HeaderNavDetail from "../components/header-nav-detail";
import HeaderNavThumbs from "../components/header-nav-thumbs";
import { NAV_CHECKBOX_CHANGE, TOGGLE_THEME } from "../lib/store";

const HeaderNav = (props) => {
  const { navType, titleText, subtitleText } = props;

  const dispatch = useDispatch();
  const history = useHistory();

  const navBrand = useSelector((state) => {
    return state.app.nav.brand;
  });

  const navCheckboxes = useSelector((state) => {
    return state.app.nav.checkboxes;
  });

  const backClick = () => {
    history.push("/");
  };

  const brandClick = (e) => {
    e.stopPropagation();
    history.push("/about");
  };

  const themeClick = () => {
    dispatch(TOGGLE_THEME());
  };

  const checkboxChange = (e) => {
    const payload = { id: e.target.id, checked: e.target.checked };
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
          brandName={navBrand}
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
