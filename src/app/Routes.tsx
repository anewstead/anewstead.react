import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import About from "../pages/about";
import Home from "../pages/home";
import NoMatch from "../pages/no-match/NoMatch";
import Project from "../pages/project";
import { IRootState } from "./store/types";

const Routes: React.FC = () => {
  const mainData = useSelector((state: IRootState) => {
    return state.app.mainData;
  });

  return (
    <Switch>
      <Route
        path="/project/:id"
        render={(routeProps) => {
          const data = mainData.find((obj) => {
            return Number(obj.id) === Number(routeProps.match.params.id);
          });
          const content = data ? (
            <Project projectData={data} routeProps={routeProps} />
          ) : (
            <NoMatch {...routeProps} />
          );
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
        render={(routeProps) => {
          return <NoMatch {...routeProps} />;
        }}
      ></Route>
    </Switch>
  );
};

export default Routes;
