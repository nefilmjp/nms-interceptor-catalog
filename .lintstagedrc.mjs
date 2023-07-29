export default {
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}': 'eslint --cache --fix',
  '*.{css,scss}': 'stylelint --fix',
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,css,scss}': 'prettier --write',
};
