module.exports = {
  root: true,
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "typescript-sort-keys",
    "sort-destructure-keys",
    "@typescript-eslint",
  ],
  globals: { React: true },
  rules: {
    "no-unused-vars": [1, { args: "after-used", argsIgnorePattern: "^_" }],
    "react/jsx-sort-props": [
      1,
      {
        callbacksLast: true,
        noSortAlphabetically: false,
        shorthandFirst: true,
      },
    ],
    "typescript-sort-keys/interface": 1,
    "typescript-sort-keys/string-enum": 1,
    "sort-destructure-keys/sort-destructure-keys": 1,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    quotes: "off",
    "@typescript-eslint/quotes": "off",
    "react/display-name": "off",
  },
};
