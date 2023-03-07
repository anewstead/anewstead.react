// eslint-disable-next-line import/no-extraneous-dependencies
const findChrome = require("chrome-finder");

const chromePath = findChrome();

module.exports = {
  // recommended to manually run site locally in separate process.
  // start a server via config this way if you need to integrate to CI
  // server: {
  //   command: `PORT=3003 npm start`,
  //   port: 3003,
  //   launchTimeout: 20000,
  //   debug: true,
  // },
  launch: {
    headless: false,
    slowMo: 50,
    timeout: 10000,
    executablePath: chromePath,
    args: ["--window-size=1280,1024"],
  },
};
