module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
  ],

  "env": {
    "node": true,
    "es6": true
  },

  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaVersion": 2018
  },

  "rules": {
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "ignore"
    }],

    "quotes": ["error", "double"],
    "generator-star-spacing": [2, "before"], // enforce the spacing around the * in generator functions (off by default)
    "keyword-spacing": ["error", { "before": true, "after": true }], // require a space after return, throw, and case

    "no-console": ["off"],
    "no-extra-semi": ["error"],
    "no-unused-vars": ["error"],

    "semi": [
      "error",
      "always"
    ],
    "space-infix-ops": ["error", { "int32Hint": true }], // require spaces around operators
  }
};
