const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  globals: {
    describe: true,
    it: true,
    expect: true,
    beforeEach: true,
    NodeJS: true,
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    extraFileExtensions: ['.vue'],
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['vue', '@typescript-eslint', 'simple-import-sort', 'prettier'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // eslint (http://eslint.cn/docs/rules)
    'no-var': ['error'], //禁止使用var
    'no-multiple-empty-lines': ['error', { max: 1 }], // 禁止多行空白行
    'no-debugger': ['error'], // 禁止使用debugger
    'no-unused-vars': ['off'], // 未使用变量检查
    'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }], // 优先使用const
    'no-extra-bind': ['error'], // 禁止不必要的bind调用
    'no-sparse-arrays': ['off'], // 可以使用稀疏数组
    'no-param-reassign': ['off'],
    'no-control-regex': ['off'],

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ], // 未使用变量检查
    '@typescript-eslint/class-literal-property-style': ['off'], // 只读字面量风格检查
    '@typescript-eslint/no-empty-function': ['off'], // 禁止使用空方法
    '@typescript-eslint/no-require-imports': ['off'],
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],

    // vue (https://eslint.vuejs.org/rules)
    'vue/require-default-prop': ['off'],
    'vue/no-mutating-props': ['off'],
    'vue/multi-word-component-names': ['off'], // vue组件名必须是多个单词
    'vue/padding-line-between-blocks': ['error'], // <template/>和<script/>之间必须空行
    'vue/component-tags-order': ['off', { order: ['template', 'script:not([setup])', 'script[setup]', 'style'] }], // 组件标签顺序
    'vue/block-lang': ['error', { script: { lang: 'ts' } }], // script的lang必须是ts
    'vue/no-template-shadow': ['off'],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'DEFINITION',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
      },
    ], // 组件属性顺序
    'vue/order-in-components': [
      'error',
      {
        order: [
          'name',
          ['components', 'directives'],
          ['mixins', 'provide', 'inject'],
          'props',
          'emits',
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          ['template', 'render'],
          'renderError',
        ],
      },
    ], // 组件属性声明顺序
    'vue/valid-attribute-name': ['off'], // 检查无效的HTML属性
    'vue/no-v-html': ['off'],
    'vue/no-unused-refs': ['error'], // 检查未使用的refs
    'vue/no-lone-template': ['error'], // 禁止没有属性的<template></template>
    'vue/v-on-function-call': ['error'], // 禁止在v-on为没有参数的方法添加括号
    'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }],

    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['./polyfills'],
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
          ],
          // Packages. `vue` related packages come first.
          ['^(vue|vite)', '^@?\\w'],
          ['^(@topo)(/.*|$)'],
          // Internal packages.
          ['^(@|@editor)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.s?css$'],
        ],
      },
    ],

    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'es5',
        semi: true,
        arrowParens: 'always',
        bracketSpacing: true,
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        endOfLine: 'auto',
        vueIndentScriptAndStyle: false,
        vueIndentHTML: false,
      },
    ],
  },
});
