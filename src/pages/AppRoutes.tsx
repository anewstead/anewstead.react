import React from "react";
import { Route, Routes } from "react-router-dom";

import About from "../layout/about";
import Home from "../layout/home";
import NoMatch from "../layout/no-match/NoMatch";
import Project from "../layout/project";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="project/:id" element={<Project />} />
      <Route path="about" element={<About />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default AppRoutes;
