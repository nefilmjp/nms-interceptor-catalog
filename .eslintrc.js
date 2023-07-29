module.exports = {
  root: true,
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:i/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  plugins: ['eslint-plugin-tsdoc'],
  rules: {
    'tsdoc/syntax': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { varsIgnorePattern: 'debug' },
    ],
    '@next/next/no-img-element': 'off', // for Static
    'react/jsx-sort-props': ['error', { multiline: 'last' }],
    'import/no-unresolved': 'error',
    'import/named': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
          'unknown',
        ],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
  },
};
