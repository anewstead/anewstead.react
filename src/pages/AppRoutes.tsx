import React, { Suspense } from "react";

import { lazily } from "react-lazily";
import { Route, Routes } from "react-router-dom";

// TODO: update to reactRouter v6 syntax

const { About } = lazily(() => {
  return import("../content/about");
});
const { Home } = lazily(() => {
  return import("../content/home");
});
const { NoMatch } = lazily(() => {
  return import("../content/no-match");
});
const { Project } = lazily(() => {
  return import("../content/project");
});

export const AppRoutes = () => {
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
