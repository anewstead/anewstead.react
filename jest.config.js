module.exports = {
  collectCoverageFrom: ["src/**/{!(*.stories),}.(js|jsx|mjs|cjs|ts|tsx)"],

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/src/styleMock.js",
  },

  resetMocks: false,

  roots: ["<rootDir>/src"],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],

  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)?$": "jest-esbuild",
  },

  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};
