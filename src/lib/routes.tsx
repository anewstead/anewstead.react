import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import About from "../pages/about";
import Home from "../pages/home";
import NoMatch from "../pages/no-match";
import Project from "../pages/project";
import { IRootState } from "./store";

const Routes: React.FC = () => {
  const mainData = useSelector((state: IRootState) => {
    return state.app.mainData;
  });

  return (
    <Switch>
      <Route
        path="/project/:id"
        render={(props) => {
          const data = mainData.find((obj) => {
            return Number(obj.id) === Number(props.match.params.id);
          });
          let content;
          if (data) {
            content = <Project projectData={data} routeProps={props} />;
          } else {
            content = <NoMatch {...props} />;
          }
          return content;
        }}
      />

      <Route
        path="/about"
        render={() => {
          return <About />;
        }}
      />

      <Route
        path="/"
        exact
        render={() => {
          return <Home />;
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
