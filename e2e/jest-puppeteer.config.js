/* eslint-disable check-file/filename-naming-convention */

const findChrome = require("chrome-finder");

const chromePath = findChrome();

module.exports = {
  launch: {
    headless: false,
    slowMo: 250,
    timeout: 10000,
    executablePath: chromePath,
  },
};
