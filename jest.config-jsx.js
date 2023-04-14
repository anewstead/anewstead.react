/*
where jsx imports functions from local js files those will also be included for coverage.

this is different from the test coverage for the js file itself (test is abstract, i.e. unit test).
here the function is tested in context (not abstract, i.e. integration test).

this ensures correct use, particularly where an imported function has switching logic (if/else),
then your jsx must handle those variations and therefore so too your jsx test cases

e.g.
from the same function the test is different.
the unit test might expect boolean (success | fail)
the integration test might expect display (image | errorMsg)

component.test.jsx is therefore a unit test for itself and an integration test for consumed.js
this concept iterates up the chain
function > simpleComponent > complexComponent > page > app

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
