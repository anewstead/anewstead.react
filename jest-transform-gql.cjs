/* eslint-disable */

// jest-transform-graphql@2.1.0 doesnt work correctly with jest 28+
// fix:
// https://github.com/remind101/jest-transform-graphql/issues/13#issuecomment-1367564978
// note.
// if adding to project that has already been running jest then run 'jest --clearCache'
// should only need to clearCache when first adding this transformer (maybe also if removing)
// also tried @graphql-tools/jest-transform@2.0.0 which didn't work
//
// imports jest-transform-graphql process renames as upstreamProcess to avoid name clash
// returns its output as 'code' variable required by jest 28+
const { process: upstreamProcess } = require("jest-transform-graphql");

const process = (...args) => {
  const code = upstreamProcess(...args);
  return { code };
};

module.exports = { process };
