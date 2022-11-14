import React from "react";
import { Button, useTheme } from "@mui/material";
import { fireEvent, render, screen } from "@testing-library/react";

import ThemeWrapper from "./ThemeWrapper";
import renderWithExpectedError from "../../test-utils/renderWithExpectedError";
import theme from "./theme.style";
import { useThemeWrapperContext } from "./ThemeWrapperContext";

const TestComponent = () => {
  const { toggleTheme } = useThemeWrapperContext();
  const utheme = useTheme();
  return (
    <Button
      onClick={() => {
        toggleTheme();
      }}
      style={{ backgroundColor: utheme.palette.background.paper }}
    />
  );
};

const ThemedTestComponent = (
  <ThemeWrapper>
    <TestComponent />
  </ThemeWrapper>
);

test("throws error if useContext not within Provider scope", async () => {
  expect(renderWithExpectedError(<TestComponent />)).toBeTruthy();
});

test("renders content with theme background colour and toggles theme", async () => {
  const bgLight = theme.light.palette.background.paper;
  const bgDark = theme.dark.palette.background.paper;
  render(ThemedTestComponent);
  const btn = screen.getByRole("button");
  expect(btn).toBeInTheDocument();
  expect(btn).toHaveStyle({ "background-color": bgLight });
  fireEvent.click(btn);
  expect(btn).toHaveStyle({ "background-color": bgDark });
});
