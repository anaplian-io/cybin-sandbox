import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import * as globals from 'globals';

export default defineConfig(
  {
    ignores: ['**/coverage/', '**/dist/', 'node_modules/'],
  },
  {
    files: ['**/*.{ts}', '**/*.{tsx}'],
    languageOptions: { globals: globals.browser },
  },
  ...tseslint.configs.recommended,
);
