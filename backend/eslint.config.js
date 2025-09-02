import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.ts"],
    ignores: ["node_modules/**", "dist/**", "**/*.config.js", "**/.eslintrc.*", "**/.prettierrc.*"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module"
      },
      globals: globals.node
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: prettierPlugin
    },
    rules: {
      "indent": ["error", 2],
      "linebreak-style": ["error", "unix"],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "prettier/prettier": "error"
    }
  }
];
