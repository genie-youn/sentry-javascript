// Note: All paths are relative to the directory in which eslint is being run, rather than the directory where this file
// lives

// ESLint config docs: https://eslint.org/docs/user-guide/configuring/

module.exports = {
  extends: ['../../.eslintrc.js'],
  ignorePatterns: [
    'coverage/**',
    'build/**',
    'dist/**',
    'cjs/**',
    'esm/**',
    'examples/**',
    'test/manual/**',
    'types/**',
    // TODO: Remove these after migration
    'scripts/**',
    'config/**',
    'config/**',
    '__mocks__/**',
  ],
  overrides: [
    {
      files: ['worker/**/*.ts'],
      parserOptions: {
        // TODO: figure out if we need a worker-specific tsconfig
        project: ['config/tsconfig.worker.json'],
      },
    },
    {
      files: ['src/worker/**/*.js'],
      parserOptions: {
        sourceType: 'module',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      rules: {
        // TODO (high-prio): Go through console logs and figure out which ones should be replaced with the SDK logger
        'no-console': 'off',
        // TODO (high-pio): Re-enable this after migration
        'no-restricted-globals': 'off',
        // TODO (high-prio): Re-enable this after migration
        '@typescript-eslint/explicit-member-accessibility': 'off',
        // TODO (high-prio): Remove this exception from naming convention after migration
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'memberLike',
            modifiers: ['private'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
          {
            selector: 'memberLike',
            modifiers: ['protected'],
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
        ],
        // TODO (high-prio): Re-enable this after migration
        '@sentry-internal/sdk/no-async-await': 'off',
        // TODO (high-prio): Re-enable this after migration
        '@typescript-eslint/no-floating-promises': 'off',
        // TODO (medium-prio): Re-enable this after migration
        'jsdoc/require-jsdoc': 'off',
        // TODO: Do we even want to turn this on? Why not enable ++?
        'no-plusplus': 'off',
      },
    },
    {
      files: ['jest.setup.ts'],
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['test/**/*.ts'],
      parserOptions: {
        // TODO: remove this parserOptions object after we added a tsconfig.test.json
        // Replay previously didn't have a tsconfig.test.json, so for now we just the regular one.
        project: ['tsconfig.json'],
      },
      rules: {
        // TODO: decide if we want to keep our '@test' import paths
        'import/no-unresolved': 'off',
        // most of these errors come from `new Promise(process.nextTick)`
        '@typescript-eslint/unbound-method': 'off',
        // TODO: decide if we want to enable this again after the migration
        // We can take the freedom to be a bit more lenient with tests
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
  ],
};
