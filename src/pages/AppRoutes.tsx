import React from "react";

import { Route, Routes } from "react-router-dom";

import About from "../content/about";
import Home from "../content/home";
import NoMatch from "../content/no-match/NoMatch";
import Project from "../content/project";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="project/:uid" element={<Project />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default AppRoutes;
