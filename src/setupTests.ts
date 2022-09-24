// https://github.com/testing-library/jest-dom
// https://github.com/clarkbw/jest-localstorage-mock/issues/125
import "@testing-library/jest-dom/extend-expect";
import "jest-localstorage-mock";

import mediaQuery from "css-mediaquery";

import { server } from "./app/api/mock/server";

// ----------
// fix missing media query adapted from:
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// https://mui.com/material-ui/react-use-media-query/#testing
// https://github.com/ericf/css-mediaquery
function createMatchMedia(width: number) {
  return (query: any) => {
    return {
      matches: mediaQuery.match(query, {
        width,
      }),
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  };
}
// initial matchMedia
window.matchMedia = createMatchMedia(window.innerWidth);
// add resize function with matchmedia
window.resizeTo = function resizeTo(width, height) {
  window.matchMedia = createMatchMedia(width);
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event("resize"));
};
// ----------

// ----------
// msw server: https://mswjs.io/docs/getting-started/mocks
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetStatus();
  server.resetHandlers();
  window.resizeTo(1024, 768); // RTL default window
  jest.clearAllMocks(); // do not 'resetAllMocks' as breaks jest-localstorage-mock
  localStorage.clear();
  sessionStorage.clear();
});

afterAll(() => {
  server.close();
});
// ----------
