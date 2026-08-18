import { defineConfig } from 'oxfmt';

export default defineConfig({
  printWidth: 80,
  semi: true,
  singleQuote: true,
  sortPackageJson: false,
  tabWidth: 2,
  trailingComma: 'all',

  ignorePatterns: [
    '.gitignore',
    '.prettierignore',
    'yarn.lock',
    'yarn-error.log',
    'package-lock.json',
    'dist',
    'coverage',
    'node_modules',
  ],

  sortImports: {
    newlinesBetween: true,
    customGroups: [
      {
        elementNamePattern: ['react', 'react-**'],
        groupName: 'react-imports',
      },
      {
        elementNamePattern: ['@mui/**'],
        groupName: '@mui-import',
      },
      {
        elementNamePattern: ['src/**'],
        groupName: 'absolute-imports',
      },
    ],
    groups: [
      ['react-imports', 'value-builtin', 'value-external', 'type-import'],
      '@mui-import',
      'absolute-imports',
      ['value-internal', 'type-internal'],
      ['value-parent', 'type-parent'],
      ['value-sibling', 'value-index'],
      ['type-sibling', 'type-index'],
      'unknown',
    ],
  },
});
