const sortOrderSmacss = require('stylelint-config-property-sort-order-smacss/generate');

module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'number-max-precision': 11,
    // for Sass
    'function-no-unknown': null,
    'selector-anb-no-unmatchable': null,
    'at-rule-empty-line-before': null,
    // for old Safari
    'declaration-block-no-redundant-longhand-properties': [
      true,
      { ignoreShorthands: ['inset'] },
    ],
    // Syntax for class selector
    // - `.foo` `.fooBarBaz` `.fooBarBaz_hogeFuga`
    'selector-class-pattern':
      '^(?:[a-z][a-z0-9]*)(?:[A-Z0-9][a-z0-9]*)*(?:_(?:[a-z][a-z0-9]*)(?:[A-Z0-9][a-z0-9]*)*)*$',
    'scss/percent-placeholder-pattern':
      '^_?(?:[a-z][a-z0-9]*)(?:-[a-z][a-z0-9]*)*$',
    'order/properties-alphabetical-order': null,
    // Sort props
    'order/properties-order': [
      { groupName: 'all', properties: ['all'] },
      // SMACSS
      ...sortOrderSmacss({
        emptyLineBefore: 'never',
        unspecified: 'bottomAlphabetical',
        emptyLineBeforeUnspecified: 'always',
      }),
    ],
  },
};
