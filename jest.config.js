// /** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // preset: "ts-jest",
  // collectCoverageFrom: ["src/**/{!(*.stories),}.(js|mjs|cjs|ts)"],

  // coverageDirectory: "coverage",

  // coverageProvider: "v8",

  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/src/styleMock.js",
  },

  resetMocks: false,

  roots: ["<rootDir>/src"],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  testEnvironment: "jsdom",

  testMatch: ["**/__tests__/**/*.[jt]s", "**/?(*.)+(spec|test|stories).[jt]s"],

  // transform: {
  //   "^.+\\.(js|mjs|cjs|ts)?$": "jest-esbuild",
  // },

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|mjs|cjs|ts)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
