import eslintPluginPrettier from 'eslint-plugin-prettier';
import * as tsParser from '@typescript-eslint/parser';
import * as eslintPluginTs from '@typescript-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
    },
    plugins: {
      '@typescript-eslint': eslintPluginTs,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      ...eslintPluginTs.configs.recommended.rules,
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
    },
  },
  {
    ignores: ['coverage/**', 'dist/**'],
  },
];
