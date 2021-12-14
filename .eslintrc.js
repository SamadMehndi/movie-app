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
        indent: ["error", 4],
        semi: ["error", "always"],
        quotes: ["off", "double"],
        camelcase: "off",
        "no-extra-semi": "error",
        "no-console": "off",
        'max-len': ["error", { code: 200 }],
        'no-return-await': 'off',
        'no-unused-expressions': 'off',
        'consistent-return': 'off',
        'no-unused-vars': 'off',
    },
};
