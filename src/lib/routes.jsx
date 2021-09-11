import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import About from "../pages/about";
import Home from "../pages/home";
import NoMatch from "../pages/no-match";
import Project from "../pages/project";

const Routes = () => {
  const mainData = useSelector((state) => {
    return state.app.mainData;
  });
  const brand = useSelector((state) => {
    return state.app.nav.brand;
  });

  return (
    <Switch>
      <Route
        path="/project/:id"
        render={(props) => {
          const data = mainData.find((obj) => {
            return obj.id === props.match.params.id;
          });
          let content;
          if (data) {
            content = <Project projectData={data} />;
          } else {
            content = <NoMatch {...props} />;
          }
          return content;
        }}
      />

      <Route
        path="/about"
        render={(props) => {
          return <About titleText={brand} {...props} />;
        }}
      />

      <Route
        path="/"
        exact
        render={(props) => {
          return <Home headerNav="main" {...props} />;
        }}
      />

      <Route
        path="*"
        render={(props) => {
          return <NoMatch {...props} />;
        }}
      ></Route>
    </Switch>
  );
};

export default Routes;
