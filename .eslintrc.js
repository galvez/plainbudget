module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  rules: {
    'arrow-parens': [2, 'always']
  },
  globals: {
    'dataLayer': true
  }
}
