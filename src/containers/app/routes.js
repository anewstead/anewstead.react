import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { navCheckboxChange, toggleTheme } from "./store";

import About from "../about/about";
import HeaderNavDetail from "../../components/header-nav-detail/header-nav-detail";
import HeaderNavMain from "../../components/header-nav-main/header-nav-main";
import Home from "../home/home";
import React from "react";

const Routes = ({ navBrand, navCheckboxes }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const backClick = () => {
    history.goBack();
  };

  const themeClick = () => {
    dispatch(toggleTheme());
  };

  const checkboxChange = (e) => {
    const payload = { id: e.target.id, checked: e.target.checked };
    dispatch(navCheckboxChange(payload));
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/about">
          <HeaderNavDetail
            brandName={navBrand}
            onBrandClick={backClick}
            onThemeClick={themeClick}
          />
          <About />
        </Route>
        <Route path="/">
          <HeaderNavMain
            brandName={navBrand}
            checkboxData={navCheckboxes}
            onBrandClick={backClick}
            onThemeClick={themeClick}
            onCheckboxChange={checkboxChange}
          />
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    navBrand: state.app.nav.brand,
    navCheckboxes: state.app.nav.checkboxes,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
