/*
where jsx imports functions from local js files those will also be included in this coverage.
coverage output may highlight different case from the coverage for the js file by itself.
this is unit vs. integration testing and ensures correct use of the unit

note.
do not write script in an index.js file, they are not included for coverage
index files should only be used to import/export for package structure
*/

const jestConfigBase = require("./jest.config-base");

module.exports = {
  ...jestConfigBase,

  coverageDirectory: "./coverage/jest-jsx",

  coverageReporters: ["text", "lcov", ["json", { file: "coverage-jsx.json" }]],

  testMatch: ["**/*.test.[jt]sx"],

  collectCoverageFrom: [
    "!**/.*",
    "!**/*.json",
    "!**/index.[jt]s?(x)",
    "!**/*.(test|stories|style).[jt]s?(x)",
  ],
};
