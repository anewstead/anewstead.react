/**
 * base to extend for multiple jest configs,
 * not to be used directly by jest
 */

module.exports = {
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/test-utils/styleMock.js",
  },

  resetMocks: false,

  roots: ["<rootDir>/src"],

  setupFilesAfterEnv: ["<rootDir>/test-utils/setupTests.ts"],

  testEnvironment: "jsdom",

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|mjs|cjs|ts)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
