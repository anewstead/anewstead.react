module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "check-file", "prettier"],
  extends: [
    "react-app",
    "react-app/jest",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "prettier",
  ],
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    project: "./tsconfig.json", // required by airbnb
  },
  rules: {
    "@typescript-eslint/naming-convention": "warn",

    "arrow-body-style": ["error", "always"],
    "arrow-parens": ["error", "always"],

    "check-file/filename-naming-convention": [
      "error",
      {
        // camelCase
        "src/**/*.{js,ts,css,scss}": "CAMEL_CASE",
        // PascalCase
        "src/(!index)/**/*.{jsx,tsx}": "PASCAL_CASE",
      },
      { ignoreMiddleExtensions: true },
    ],
    "check-file/folder-naming-convention": [
      "error",
      { "src/**/": "KEBAB_CASE" }, // kebab-case
    ],

    curly: "error",
    "import/prefer-default-export": "off",
    "no-confusing-arrow": ["error", { allowParens: true }],
    "no-mixed-operators": "error",
    "prefer-arrow-callback": "error",
    "prefer-template": "error",

    "prettier/prettier": ["warn", {}, { usePrettierrc: true }],

    "react/function-component-definition": [
      "warn",
      { namedComponents: "arrow-function" },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-useless-fragment": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",

    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",
  },
};
