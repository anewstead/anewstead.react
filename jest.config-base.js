/**
 * base to extend for multiple jest configs,
 * not to be used directly by jest
 */

module.exports = {
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/src/styleMock.js",
  },

  resetMocks: false,

  roots: ["<rootDir>/src"],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  testEnvironment: "jsdom",

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|mjs|cjs|ts)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
