import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import About from "../about/about";
import Gallery from "../gallery/gallery";
import Home from "../home/home";
import NoMatch from "../no-match/no-match";
import Video from "../video/video";

const Routes = () => {
  const mainData = useSelector((state) => {
    return state.app.mainData;
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
            switch (data.view.type) {
              case "gallery":
                content = (
                  <Gallery
                    titleText={data.client}
                    subtitleText={`${data.brand} - ${data.project}`}
                    data={data}
                    {...props}
                  />
                );
                break;

              case "video":
                content = (
                  <Video
                    titleText={data.client}
                    subtitleText={`${data.brand} - ${data.project}`}
                    data={data}
                    {...props}
                  />
                );
                break;

              default:
                content = <NoMatch {...props} />;
                break;
            }
          } else {
            content = <NoMatch {...props} />;
          }
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
