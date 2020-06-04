import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import HeaderNav from '../components/header-nav/header-nav';

import Home from '../containers/home/home';
import About from '../containers/about/about';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/about">
          <HeaderNav navType="detail" />
          <About />
        </Route>
        <Route path="/">
          <HeaderNav navType="main" />
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
