module.exports = {
    env: {
      es2021: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier", // Enables Prettier rules to avoid conflicts
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    // rules: {
    //   "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    //   "@typescript-eslint/no-explicit-any": "warn",
    //   "@typescript-eslint/explicit-module-boundary-types": "off",
    //   "no-console": "warn",
    //   "prettier/prettier": "error",
    // },
  };
  