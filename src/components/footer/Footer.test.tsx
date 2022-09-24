import React from "react";
import { render, screen } from "@testing-library/react";

import Footer from "./Footer";

test("renders Footer", async () => {
  const TEXT = "test brand";
  const DATE = new Date().getFullYear();
  render(<Footer brand={TEXT} />);
  const footer = screen.getByRole("contentinfo");
  expect(footer).toBeInTheDocument();
  expect(footer).toHaveTextContent(`© ${TEXT} ${DATE}`);
});
