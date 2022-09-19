// https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "jest-localstorage-mock";

import { server } from "./app/api/mock/server";

// ----------
// fix: `matchMedia` not present, legacy browsers require a polyfill
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  }),
});
// ----------

// ----------
// msw server: https://mswjs.io/docs/getting-started/mocks
beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetStatus();
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});
// ----------
