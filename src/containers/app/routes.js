import React from "react";
import { Route, Switch } from "react-router-dom";

import About from "../about/about";
import Home from "../home/home";

const Routes = () => {
  return (
    <Switch>
      <Route path="/about">
        <About headerNav="detail" />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;
