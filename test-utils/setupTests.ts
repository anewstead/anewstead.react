// https://github.com/testing-library/jest-dom
// https://github.com/clarkbw/jest-localstorage-mock/issues/125

import "@testing-library/jest-dom/extend-expect";
import "jest-localstorage-mock";
import "cross-fetch/polyfill";

import "./jestWindowExtended";

import { server } from "./msw/server";

//-----
// msw@1.1.0 creates a console error log when using res.networkError()
// despite working as expected and being the intended exception as per their docs.
// to avoid confusion the following code disables errors that contain "net::ERR_FAILED'
// which is the string output from @mswjs+interceptors
// if your test arent working and you suspect network error you can comment this out,
// it wont change functionality, but adds back the console error which might help you debug
/* eslint-disable */
const conErr = console.error;
console.error = (...args) => {
  const pattern = /net::ERR_FAILED/m;
  return pattern.test(args[0]) ? null : conErr(...args);
};
/* eslint-enable */
//-----

// msw server: https://mswjs.io/docs/getting-started/mocks
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks(); // 'clearAllMocks' not 'resetAllMocks' as will break jest-localstorage-mock
  localStorage.clear();
  sessionStorage.clear();
});

afterAll(() => {
  server.close();
});
