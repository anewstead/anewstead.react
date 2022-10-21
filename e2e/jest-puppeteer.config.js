/* eslint-disable check-file/filename-naming-convention */

const findChrome = require("chrome-finder");

const chromePath = findChrome();

module.exports = {
  server: {
    command: `PORT=3003 npm start`,
    port: 3003,
    launchTimeout: 20000,
    debug: true,
  },
  launch: {
    headless: false,
    slowMo: 100,
    timeout: 10000,
    executablePath: chromePath,
  },
};
