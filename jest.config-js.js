/*
js should unit test before potential use in jsx

note.
reack hooks are js and ahould never themselves include jsx
they are however only used from a react jsx file.
react hooks are tested via 'renderhook()'
https://testing-library.com/docs/react-testing-library/api/#renderhook
*/

const jestConfigBase = require("./jest.config-base");

module.exports = {
  ...jestConfigBase,

  coverageDirectory: "./coverage/jest-js",

  coverageReporters: ["text", ["json", { file: "coverage-js.json" }]],

  collectCoverageFrom: [
    "src/**/*.[jt]s",
    "!src/**/.*.[jt]s",
    "!src/**/index.[jt]s",
    "!src/**/*.style?(s).[jt]s",
  ],

  testMatch: ["**/*.test.[jt]s"],
};
