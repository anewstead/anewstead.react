// https://github.com/testing-library/jest-dom
// https://github.com/clarkbw/jest-localstorage-mock/issues/125
import "@testing-library/jest-dom/extend-expect";
import "jest-localstorage-mock";

import "./test-utils/jestWindowExtended";

import { server } from "./core/services/mock/server";
import { serverResponseStatus } from "./core/services/mock/status";

// msw server: https://mswjs.io/docs/getting-started/mocks
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  serverResponseStatus.reset();
  server.resetHandlers();
  jest.clearAllMocks(); // 'clearAllMocks' not 'resetAllMocks' as will break jest-localstorage-mock
  localStorage.clear();
  sessionStorage.clear();
});

afterAll(() => {
  server.close();
});
