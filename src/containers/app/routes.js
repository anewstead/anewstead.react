import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import About from "../about/about";
import Gallery from "../gallery/gallery";
import Home from "../home/home";

const Routes = () => {
  const mainData = useSelector((state) => {
    return state.app.mainData;
  });
  // console.log(mainData);

  return (
    <Switch>
      <Route
        path="/gallery/:id"
        render={(props) => {
          // console.log("route:props", props);
          const data = mainData.find((obj) => {
            return obj.id === props.match.params.id;
          });
          return (
            <Gallery
              headerNav="detail"
              titleText={data.client}
              subtitleText={`${data.brand} - ${data.project}`}
              data={data}
              {...props}
            />
          );
        }}
      />
      <Route
        path="/about"
        render={(props) => {
          return <About headerNav="detail" {...props} />;
        }}
      />
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
      {/* <Route path="*">
        <NoMatch />
      </Route> */}
    </Switch>
  );
};

// function NoMatch() {
//   let location = useLocation();
//   return (
//     <div>
//       <h3>
//         404 - Page Not Found <code>{location.pathname}</code>
//       </h3>
//       <Link to="/">Homepage</Link>
//     </div>
//   );
// }

export default Routes;
