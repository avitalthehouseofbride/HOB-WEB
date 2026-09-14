import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import * as astroParser from 'astro-eslint-parser';

export default [
  { ignores: ['dist/', '.astro/', '.vercel/', 'node_modules/', '.screenshots/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: { parser: tseslint.parser, extraFileExtensions: ['.astro'] },
    },
  },
  {
    files: ['*.{js,mjs,ts}', 'scripts/**/*.{ts,mjs}', 'tests/**/*.ts'],
    languageOptions: {
      globals: { process: 'readonly', console: 'readonly', URL: 'readonly' },
    },
  },
];
