import React from "react";
import { Route, Routes } from "react-router-dom";

import About from "../pages/about";
import Home from "../pages/home";
import NoMatch from "../pages/no-match/NoMatch";
import Project from "../pages/project";

const AppRoutes: React.FC = () => {
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
