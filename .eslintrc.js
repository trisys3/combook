'use strict';

exports.parser = 'babel-eslint';

// EcmaScript 6/7
exports.parserOptions = {
  ecmaVersion: 7,
  ecmaFeatures: {
    jsx: true,
    experimentalObjectRestSpread: true,
  },
};

exports.plugins = [
  'babel',
  'react',
];

// environments
exports.env = {
  es6: true,
  node: true,
};

// individual rules
exports.rules = {
  // possible errors
  'comma-dangle': [2, 'always-multiline'],
  'no-constant-condition': 2,
  'no-dupe-args': 2,
  'no-duplicate-case': 2,
  'no-empty': 2,
  'no-empty-character-class': 2,
  'no-ex-assign': 2,
  'no-extra-boolean-cast': 2,
  'no-extra-semi': 2,
  'no-invalid-regexp': 2,
  'no-negated-in-lhs': 2,
  'no-obj-calls': 2,
  'no-regex-spaces': 2,
  'no-unexpected-multiline': 2,
  'no-unreachable': 2,
  'use-isnan': 2,

  // best practices
  'array-callback-return': 2,
  curly: 2,
  'dot-location': [2, 'property'],
  'dot-notation': 2,
  eqeqeq: [2, 'smart'],
  'no-alert': 2,
  'no-caller': 2,
  'no-else-return': 2,
  'no-empty-pattern': 2,
  'no-eval': 2,
  'no-extend-native': 2,
  'no-extra-bind': 2,
  'no-fallthrough': 2,
  'no-implied-eval': 2,
  'no-invalid-this': 2,
  'no-lone-blocks': 2,
  'no-loop-func': 2,
  'no-multi-spaces': 2,
  'no-native-reassign': 2,
  'no-new': 2,
  'no-new-func': 2,
  'no-new-wrappers': 2,
  'no-script-url': 2,
  'no-self-assign': 2,
  'no-self-compare': 2,
  'no-sequences': 2,
  'no-throw-literal': 2,
  'no-unmodified-loop-condition': 2,
  'no-unused-expressions': [2, {
    allowShortCircuit: true,
    allowTernary: true,
  }],
  'no-useless-call': 2,
  'no-useless-concat': 2,
  'no-void': 2,
  'no-with': 2,
  'wrap-iife': [2, 'inside'],
  yoda: [2, 'never', {
    exceptRange: true,
  }],

  // variables
  'no-delete-var': 2,
  'no-undef': 2,
  'no-undef-init': 2,
  'no-unused-vars': 2,

  // style
  'babel/array-bracket-spacing': 2,
  'block-spacing': [2, 'never'],
  'brace-style': 2,
  camelcase: 2,
  'comma-style': 2,
  'computed-property-spacing': [2, 'never'],
  'func-names': 2,
  indent: [2, 2, {
    SwitchCase: 1,
  }],
  'jsx-quotes': 2,
  'key-spacing': 2,
  'keyword-spacing': [2, {
    overrides: {
      for: {
        after: false,
      },
      if: {
        after: false,
      },
      while: {
        after: false,
      },
      switch: {
        after: false,
      },
      catch: {
        after: false,
      },
    },
  }],
  'linebreak-style': [2, 'unix'],
  'babel/new-cap': 2,
  'new-parens': 2,
  'newline-per-chained-call': [2, {
    ignoreChainWithDepth: 3,
  }],
  'no-array-constructor': 2,
  'no-lonely-if': 2,
  'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
  'no-multiple-empty-lines': 2,
  'no-nested-ternary': 2,
  'no-new-object': 2,
  'no-spaced-func': 2,
  'no-unneeded-ternary': 2,
  'no-whitespace-before-property': 2,
  'babel/object-curly-spacing': 2,
  'operator-assignment': 2,
  'operator-linebreak': 2,
  'padded-blocks': [2, 'never'],
  'quote-props': [2, 'as-needed'],
  quotes: [2, 'single', {avoidEscape: true}],
  semi: 2,
  'semi-spacing': 2,
  'space-before-blocks': [2, 'always'],
  'space-before-function-paren': [2, 'never'],
  'space-in-parens': [2, 'never'],
  'space-infix-ops': 2,
  'space-unary-ops': 2,
  'spaced-comment': [2, 'always'],
  'wrap-regex': 2,

  // ECMAScript 6/7
  'arrow-body-style': 2,
  'babel/arrow-parens': [2, 'as-needed'],
  'constructor-super': 2,
  'babel/generator-star-spacing': 2,
  'no-const-assign': 2,
  'no-dupe-class-members': 2,
  'no-new-symbol': 2,
  'no-this-before-super': 2,
  'no-var': 2,
  'babel/object-shorthand': 2,
  'prefer-arrow-callback': 2,
  'prefer-const': 2,
  'prefer-rest-params': 2,
  'prefer-spread': 2,
  'prefer-template': 2,
  'template-curly-spacing': 2,
  'yield-star-spacing': 2,

  // React
  'react/no-deprecated': 2,
  'react/no-danger-with-children': 2,
  'react/no-did-mount-set-state': 2,
  'react/no-did-update-set-state': 2,
  'react/no-direct-mutation-state': 2,
  'react/react-in-jsx-scope': 2,
  'react/require-render-return': 2,
  'react/self-closing-comp': 2,

  // JSX
  'react/jsx-boolean-value': 2,
  'react/jsx-closing-bracket-location': 2,
  'react/jsx-curly-spacing': 2,
  'react/jsx-equals-spacing': 2,
  'react/jsx-indent-props': 2,
  'react/jsx-no-comment-textnodes': 2,
  'react/jsx-no-duplicate-props': 2,
  'react/jsx-no-literals': 2,
  'react/jsx-no-target-blank': 2,
  'react/jsx-no-undef': 2,
  'react/jsx-pascal-case': [2, {allowAllCaps: true}],
  'react/jsx-space-before-closing': 2,
  'react/jsx-uses-react': 2,
  'react/jsx-uses-vars': 2,
};
