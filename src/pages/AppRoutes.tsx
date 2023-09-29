import React, { Suspense, lazy } from "react";

import { Route, Routes } from "react-router-dom";

const About = lazy(() => {
  return import("../content/about");
});
const Home = lazy(() => {
  return import("../content/home");
});
const NoMatch = lazy(() => {
  return import("../content/no-match");
});
const Project = lazy(() => {
  return import("../content/project");
});

const AppRoutes = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="project/:uid" element={<Project />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
