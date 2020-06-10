import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import About from "../about/about";
import Gallery from "../gallery/gallery";
import Home from "../home/home";
import NoMatch from "../no-match/no-match";

const Routes = () => {
  const mainData = useSelector((state) => {
    return state.app.mainData;
  });

  return (
    <Switch>
      <Route
        path="/gallery/:id"
        render={(props) => {
          const data = mainData.find((obj) => {
            return obj.id === props.match.params.id;
          });
          const content = data ? (
            <Gallery
              titleText={data.client}
              subtitleText={`${data.brand} - ${data.project}`}
              data={data}
              {...props}
            />
          ) : (
            <NoMatch {...props} />
          );
          return content;
        }}
      />

      <Route
        path="/about"
        render={(props) => {
          return <About {...props} />;
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
