import { defineConfig } from 'oxfmt';

export default defineConfig({
  trailingComma: 'all',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  printWidth: 80,
  sortPackageJson: false,

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
        groupName: 'react-imports',
        elementNamePattern: ['react', 'react-**'],
      },
      {
        groupName: '@mui-import',
        elementNamePattern: ['@mui/**'],
      },
      {
        groupName: 'absolute-imports',
        elementNamePattern: ['src/**'],
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
