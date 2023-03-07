module.exports = {
  setupFilesAfterEnv: ["expect-puppeteer"],
  testEnvironment: "jest-environment-puppeteer",
  testTimeout: 20000,
  preset: "../node_modules/jest-puppeteer/jest-preset.js",
  maxWorkers: 2,
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)?$": "jest-esbuild",
  },
};
