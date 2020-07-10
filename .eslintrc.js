module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],

  parserOptions: {
    parser: "babel-eslint"
  },

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "vue/no-static-inline-styles": "warn",
    "vue/no-reserved-component-names": "error",
    "vue/comma-dangle": "warn",
    "vue/eqeqeq": "warn",
    "vue/html-quotes": "warn"
  }
};
