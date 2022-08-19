module.exports = {
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "airbnb-typescript",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "typescript-sort-keys",
    "sort-destructure-keys",
    "@typescript-eslint",
    "prettier",
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
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
};
