import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    ignores: [
      'lib/*.js',
      'lib',
      'tests/js/*.js',
      'tests/js/src',
      'tests/src',
      './tests/js/*.js',
      './tests/js/src',
      './tests/src',
      './tests/tests/',
      'tests/tests/',
      'tests/*.js',
      'tests/*.js.map',
      'karma.conf.js',
    ],
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];
