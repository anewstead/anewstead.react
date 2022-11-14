// import this file into setupTest.ts (globalSetup)

import mediaQuery from "css-mediaquery";

// fix missing media query adapted from:
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// https://mui.com/material-ui/react-use-media-query/#testing
// https://github.com/ericf/css-mediaquery
export function createMatchMedia(props: {}) {
  return (query: any) => {
    return {
      matches: mediaQuery.match(query, props),
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
window.matchMedia = createMatchMedia({
  width: window.innerWidth,
  "prefers-color-scheme": "light",
});

// add resize function with matchmedia
window.resizeTo = function resizeTo(width, height) {
  window.matchMedia = createMatchMedia({ width });
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event("resize"));
};

// set back to default 1024x768 after each test
afterEach(() => {
  window.resizeTo(1024, 768); // reset to default window size
});
