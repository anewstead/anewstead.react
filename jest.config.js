/*
js should unit test before potential use in jsx

note.
reack hooks are js and ahould never themselves include jsx
they are however only used within a react jsx file.
react hooks are tested via 'renderhook()'
https://testing-library.com/docs/react-testing-library/api/#renderhook
*/

module.exports = {
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/test-utils/styleMock.js",
  },

  resetMocks: false,

  roots: ["<rootDir>/src"],

  setupFilesAfterEnv: ["<rootDir>/test-utils/setupTests.ts"],

  testEnvironment: "jsdom",

  transform: {
    "\\.(gql|graphql)$": "./jest-transform-gql.js",
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
