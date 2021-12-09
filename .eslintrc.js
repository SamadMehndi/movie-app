module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    // "no-extra-semi": "off",
    "no-console": "off",
    semi: ["error", "always"],
    quotes: ["off", "double"],
  },
};
