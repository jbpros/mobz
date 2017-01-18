const branch = require('child_process').execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
const warnOrError = branch === "master" ? "error" : "warn"

module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parserOptions": {
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "indent": [
      warnOrError,
      2,
          { "SwitchCase": 1 }
    ],
    "linebreak-style": [
      warnOrError,
      "unix"
    ],
    "semi": [
      warnOrError,
      "never"
    ],
    "no-warning-comments": ["off"],
    "comma-dangle": ["off"],
    "no-console": ["off"],
    "no-unused-vars": [warnOrError],
    "no-var": [warnOrError],
    "no-empty": [warnOrError],
    "no-multi-spaces": [warnOrError],
    "no-trailing-spaces": [warnOrError],
    "space-before-blocks": [warnOrError],
    "padded-blocks": [warnOrError, "never"],
    "arrow-spacing": [warnOrError],
    "keyword-spacing": [warnOrError],
    "space-infix-ops": [warnOrError, { "int32Hint": false }],
    "space-before-function-paren": [warnOrError, {
      "anonymous": "always",
      "named": "never",
      "asyncArrow": "always"
    }],
    "react/no-danger": [warnOrError],
    "react/prop-types": [warnOrError],
    "react/no-direct-mutation-state": [warnOrError],
    "react/jsx-indent": [warnOrError, 2],
    "react/jsx-curly-spacing": [warnOrError, "never"],
    "react/jsx-closing-bracket-location": [warnOrError, {
      "nonEmpty": "after-props",
      "selfClosing": "after-props"
    }],
    "react/jsx-space-before-closing": [warnOrError, "always"],
    "react/jsx-max-props-per-line": [warnOrError, { "maximum": 1 }],
    "react/jsx-indent-props": [warnOrError, 2],
    "react/jsx-first-prop-new-line": [warnOrError, "multiline"],
    "object-curly-spacing": [warnOrError, "always"],
    "comma-spacing": [warnOrError, {
      "before": false,
      "after": true
    }],
    "array-bracket-spacing": [warnOrError, "never"],
    "computed-property-spacing": [warnOrError, "never"],
    "space-in-parens": [warnOrError, "never"]
  }
}
