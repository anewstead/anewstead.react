// https://github.com/testing-library/jest-dom
// https://github.com/clarkbw/jest-localstorage-mock/issues/125
import "@testing-library/jest-dom/extend-expect";
import "jest-localstorage-mock";

import "./test-utils/jestWindowExtended";

import { server } from "./app/api/mock/server";

// msw server: https://mswjs.io/docs/getting-started/mocks
beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetStatus();
  server.resetHandlers();
  jest.clearAllMocks(); // 'clearAllMocks' not 'resetAllMocks' as will break jest-localstorage-mock
  localStorage.clear();
  sessionStorage.clear();
});

afterAll(() => {
  server.close();
});
