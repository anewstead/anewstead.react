import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import About from "../page/about";
import Home from "../page/home";
import NoMatch from "../page/no-match/NoMatch";
import Project from "../page/project";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="project/:id" element={<Project />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
