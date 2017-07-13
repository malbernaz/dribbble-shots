module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module"
  },
  settings: {
    react: {
      pragma: "h"
    }
  },
  rules: {
    "no-console": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/no-unknown-property": "off",
    "import/no-named-as-default": "off"
  }
};
