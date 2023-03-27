module.exports = {
  coverageDirectory: "coverage/storybook",

  coverageReporters: ["text", ["json", { file: "coverage-jest.json" }]],

  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/src/styleMock.js",
  },

  resetMocks: false,

  roots: ["<rootDir>/src"],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  testEnvironment: "jsdom",

  testMatch: ["**/__tests__/**/*.[jt]s", "**/*.test.[jt]s"],

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|mjs|cjs|ts)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
