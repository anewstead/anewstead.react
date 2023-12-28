/*
js should unit test before potential use in jsx

note.
reack hooks are js and ahould never themselves include jsx
they are however only used within a react jsx file.
react hooks are tested via 'renderhook()'
https://testing-library.com/docs/react-testing-library/api/#renderhook
*/

import type { Config } from "jest";

const config: Config = {
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
  },

  resetMocks: false,

  roots: ["./src"],

  setupFilesAfterEnv: ["./testing/setupTests.ts"],

  testEnvironment: "./testing/jsdom-extended.ts",

  testEnvironmentOptions: {
    customExportConditions: [""],
  },

  transform: {
    "\\.(gql|graphql)$": "./testing/jest-transform-gql.js",
    "\\.[jt]sx?$": "babel-jest",
  },

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|mjs|cjs|ts)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  coverageDirectory: "./coverage/jest-js",

  coverageReporters: ["text", ["json", { file: "coverage-js.json" }]],

  collectCoverageFrom: [
    "src/**/*.[jt]s",
    "!src/**/*.d.[jt]s",
    "!src/**/.*.[jt]s",
    "!src/**/index.[jt]s",
    "!src/**/*.style?(s).[jt]s",
    "!src/**/generated/**",
  ],

  testMatch: ["**/*.test.[jt]s"],
};

export default config;
