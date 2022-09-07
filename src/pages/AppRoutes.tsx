import React from "react";
import { Route, Routes } from "react-router-dom";

import About from "../page/about";
import Home from "../page/home";
import NoMatch from "../page/no-match/NoMatch";
import Project from "../page/project";

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
