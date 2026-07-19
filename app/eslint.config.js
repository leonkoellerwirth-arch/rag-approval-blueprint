import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "dev-dist", "dist-ssr", "android", "ios"]),
  {
    files: ["**/*.{js,jsx}"],
    // eslint-plugin-react-hooks 5.x stellt die Flat-Config unter `recommended-latest`
    // bereit; `configs.flat` gibt es dort nicht (Defekt im base-Template, dort gemeldet).
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: { ecmaVersion: "latest", ecmaFeatures: { jsx: true }, sourceType: "module" },
    },
    rules: { "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }] },
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { parser: tseslint.parser, globals: globals.browser },
    plugins: { "react-hooks": reactHooks, "@typescript-eslint": tseslint.plugin },
    rules: { "react-hooks/rules-of-hooks": "error", "react-hooks/exhaustive-deps": "warn" },
  },
  {
    files: ["**/*.{test,spec}.{ts,tsx}", "**/__tests__/**/*.{ts,tsx}"],
    rules: { "react-hooks/rules-of-hooks": "off" },
  },
  {
    files: ["**/*.config.{js,cjs,mjs,ts}", "scripts/**/*.{js,mjs}"],
    languageOptions: { globals: globals.node },
  },
]);
