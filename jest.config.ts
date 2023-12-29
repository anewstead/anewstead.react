/*
js should unit test before potential use in jsx

note.
reack hooks are js not jsx and should never themselves include jsx
they are however only used from within a react jsx file.
react hooks are unit tested as js via 'renderhook()'
https://testing-library.com/docs/react-testing-library/api/#renderhook
*/

import type { Config } from "jest";

const config: Config = {
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@testing/(.*)$": "<rootDir>/testing/$1",
  },

  resetMocks: false,

  roots: ["<rootDir>/src"],

  setupFilesAfterEnv: ["<rootDir>/testing/setupTests.ts"],

  testEnvironment: "<rootDir>/testing/jsdom-extended.ts",

  testEnvironmentOptions: {
    customExportConditions: [""],
  },

  transform: {
    "\\.(gql|graphql)$": "<rootDir>/testing/jest-transform-gql.js",
    "\\.[jt]sx?$": "babel-jest",
  },

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|mjs|cjs|ts)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],

  coverageDirectory: "<rootDir>/coverage/jest-js",

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
