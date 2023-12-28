// https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function

import { render } from "@testing-library/react";

import type React from "react";

// pass in component that you have setup to throw an error, e.g. is configured wrong
// returns the error without it being thrown to test runner and stopping tests
// use: expect(renderWithExpectedError(<TestComponent />)).toBeTruthy();
export const renderWithExpectedError = (ui: React.ReactElement) => {
  const consoleErrorFn = jest.spyOn(console, "error").mockImplementation(() => {
    return jest.fn();
  });
  let err = null;
  try {
    render(ui);
  } catch (e) {
    err = e;
  }
  consoleErrorFn.mockRestore();
  return err;
};
