import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: ['**/coverage/', '**/dist/', 'node_modules/'],
  },
  {
    files: ['**/*.{ts}'],
    languageOptions: { globals: globals.browser },
  },
  ...tseslint.configs.recommended,
);
