import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { Home } = await import("../content/home");
      return { Component: Home };
    },
  },
  {
    path: "project/:uid",
    async lazy() {
      const { Project } = await import("../content/project");
      return { Component: Project };
    },
  },
  {
    path: "about",
    async lazy() {
      const { About } = await import("../content/about");
      return { Component: About };
    },
  },
  {
    path: "*",
    async lazy() {
      const { NoMatch } = await import("../content/no-match");
      return { Component: NoMatch };
    },
  },
]);
