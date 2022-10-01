import React, { useContext } from "react";
import { Button, useTheme } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";

import theme from "./theme.style";
import ThemeWrapper, { ThemeWrapperContext } from "./ThemeWrapper";

const TestComp = () => {
  const themeWrapperContext = useContext(ThemeWrapperContext);
  const utheme = useTheme();
  const themeClick = () => {
    themeWrapperContext.toggleTheme();
  };
  return (
    <Button
      onClick={themeClick}
      style={{ backgroundColor: utheme.palette.background.paper }}
    />
  );
};

const ThemedTestComp = (
  <ThemeWrapper>
    <TestComp />
  </ThemeWrapper>
);

test("renders content with theme background colour and toggles theme", async () => {
  render(ThemedTestComp);
  const btn = screen.getByRole("button");
  expect(btn).toBeInTheDocument();
  const bgLight = theme.light.palette.background.paper;
  const bgDark = theme.dark.palette.background.paper;
  expect(btn).toHaveStyle({ "background-color": bgLight });
  fireEvent.click(btn);
  expect(btn).toHaveStyle({ "background-color": bgDark });
});
