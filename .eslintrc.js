process.chdir(__dirname)

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true,
    codeFrame: false,
  },

  extends: ['airbnb-standard'],
  rules: {
    semi: ['error', 'never'],
    'linebreak-style': ['error', 'windows'],
  },
}
