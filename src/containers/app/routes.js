import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import HeaderNavDetail from "../../components/header-nav-detail/header-nav-detail";
import HeaderNavMain from "../../components/header-nav-main/header-nav-main";
import About from "../about/about";
import Home from "../home/home";
import { navCheckboxChange, toggleTheme } from "./store";

const Routes = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const navBrand = useSelector((state) => {
    return state.app.nav.brand;
  });

  const navCheckboxes = useSelector((state) => {
    return state.app.nav.checkboxes;
  });

  useEffect(() => {});

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

  return (
    <Switch>
      <Route path="/about">
        <HeaderNavDetail
          brandName={navBrand}
          onBackClick={backClick}
          onThemeClick={themeClick}
        />
        <About />
      </Route>
      <Route path="/">
        <HeaderNavMain
          brandName={navBrand}
          checkboxData={navCheckboxes}
          onBrandClick={brandClick}
          onThemeClick={themeClick}
          onCheckboxChange={checkboxChange}
        />
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
