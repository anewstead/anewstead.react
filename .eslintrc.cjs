/**
 * Airbnb requires/uses:
 *
 * - Eslint
 * - Eslint-plugin-import
 * - Eslint-plugin-react
 * - Eslint-plugin-react-hooks
 * - Eslint-plugin-jsx-a11y
 *
 * Airbnb-typescript uses:
 *
 * - @typescript-eslint/eslint-plugin
 * - @typescript-eslint/parser
 */
module.exports = {
  env: {
    browser: true,
    jasmine: true,
    jest: true,
    node: true,
  },

  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "airbnb-typescript",
    "plugin:jest/recommended",
    "plugin:jest-dom/recommended",
    "plugin:json/recommended",
    "plugin:storybook/recommended",
    "prettier",
  ],

  settings: {
    "import/resolver": {
      typescript: {},
    },
  },

  parser: "@typescript-eslint/parser",

  parserOptions: {
    extraFileExtensions: [".json"],
    project: ["./tsconfig.eslint.json"],
  },

  plugins: ["import", "react", "@typescript-eslint", "check-file", "json"],

  root: true,

  ignorePatterns: ["**/vendor/", "**/generated/"],

  overrides: [
    {
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      files: ["**/*.{js,json}"],
    },
    {
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["**/*.{ts,tsx}"],
    },
    {
      files: ["**/*.{stories,config}.*"],
      rules: {
        "import/no-anonymous-default-export": "off",
        "import/no-default-export": "off",
      },
    },
    {
      files: ["src/pages/**/*"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],

  rules: {
    "@typescript-eslint/ban-ts-comment": [
      "warn",
      {
        "ts-check": false,
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description",
        "ts-nocheck": "allow-with-description",
      },
    ],

    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/naming-convention": "warn",
    "@typescript-eslint/no-floating-promises": "off",

    "@typescript-eslint/no-use-before-define": ["error", { functions: false }],

    "@typescript-eslint/prefer-nullish-coalescing": [
      "error",
      { ignoreMixedLogicalExpressions: true },
    ],

    "arrow-body-style": ["error", "always"],
    "arrow-parens": ["error", "always"],

    "check-file/filename-naming-convention": [
      "error",
      {
        "src/(!index)/**/*.{jsx,tsx}": "PASCAL_CASE",
        "src/**/*.{js,ts,css,scss}": "CAMEL_CASE",
      },
      { ignoreMiddleExtensions: true },
    ],

    "check-file/folder-naming-convention": [
      "error",
      { "src/!(__{tests,mocks}__|@*)/**/": "KEBAB_CASE" },
    ],

    curly: "error",

    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/no-default-export": "error",

    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "*",
          "e2e/**",
          ".storybook/**",
          "testing/**",
          "**/__mocks__/**",
          "**/__tests__/**",
          "**/*.@(test|spec|stories).{js,jsx,ts,tsx}",
        ],
      },
    ],

    "import/order": [
      "warn",
      {
        alphabetize: {
          caseInsensitive: true,
          order: "asc",
        },
        distinctGroup: true,
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        pathGroups: [
          {
            group: "external",
            pattern: "react+(|-native)",
            position: "before",
          },
          {
            group: "type",
            pattern: "react+(|-native)",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react+(|-native)", "type"],
      },
    ],

    "import/prefer-default-export": "off",
    "json/*": ["error", { allowComments: true }],

    "no-confusing-arrow": ["error", { allowParens: true }],
    "no-mixed-operators": "error",
    "no-void": ["error", { allowAsStatement: true }],

    "prefer-arrow-callback": "error",
    "prefer-template": "error",

    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/rules-of-hooks": "error",

    "react/function-component-definition": [
      "warn",
      { namedComponents: "arrow-function" },
    ],

    "react/jsx-no-useless-fragment": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
  },
};
