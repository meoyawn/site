/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    eqeqeq: ["error", "always"],
    "no-console": "error",

    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/no-for-in-array": "error",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-ignore": "allow-with-description",
        minimumDescriptionLength: 1,
      },
    ],
  },
}
