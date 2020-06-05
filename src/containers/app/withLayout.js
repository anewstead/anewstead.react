import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import HeaderNavDetail from "../../components/header-nav-detail/header-nav-detail";
import HeaderNavMain from "../../components/header-nav-main/header-nav-main";
import { navCheckboxChange, toggleTheme } from "./store";

const withLayout = (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();

    const history = useHistory();

    const headerNav = props.headerNav || "main";

    const navBrand = useSelector((state) => {
      return state.app.nav.brand;
    });

    const navCheckboxes = useSelector((state) => {
      return state.app.nav.checkboxes;
    });

    const backClick = () => {
      history.push("/");
    };

    const brandClick = () => {
      history.push("/about");
    };

    const themeClick = () => {
      dispatch(toggleTheme());
    };

    const checkboxChange = (e) => {
      const payload = { id: e.target.id, checked: e.target.checked };
      dispatch(navCheckboxChange(payload));
    };

    let nav;
    switch (headerNav) {
      case "detail":
        nav = (
          <HeaderNavDetail
            brandName={navBrand}
            onBackClick={backClick}
            onThemeClick={themeClick}
          />
        );
        break;

      default:
        nav = (
          <HeaderNavMain
            brandName={navBrand}
            checkboxData={navCheckboxes}
            onBrandClick={brandClick}
            onThemeClick={themeClick}
            onCheckboxChange={checkboxChange}
          />
        );
        break;
    }

    return (
      <>
        {nav}
        <main>
          <WrappedComponent {...props} />
        </main>
      </>
    );
  };
};

export default withLayout;
