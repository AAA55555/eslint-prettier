const ruleLevel = process.env.MODE !== 'production' ? 'warn' : 'error'

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    $config: 'readonly',
    $nuxt: 'readonly',
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  plugins: ['simple-import-sort'],
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended', // Чтобы Eslint и Prettier не конфликтовали
  ],
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'simple-import-sort/imports': ruleLevel,
        'simple-import-sort/exports': ruleLevel,
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
    'no-console': ruleLevel,
    'no-unused-vars': [
      ruleLevel,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'vue/no-unused-properties': [
      ruleLevel,
      {
        groups: ['props', 'data', 'computed', 'methods'],
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: { void: 'always' },
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [],
        patterns: [
          {
            group: ['*/storybook/ui/*'],
            message: 'Importing from the storybook/ui directory is prohibited.',
          },
          {
            group: ['*/**/index.vue'],
            message:
              'Importing index.vue from directory is prohibited. You need to omit import.vue',
          },
          {
            group: [
              '*/pages/**/_ui/**/*',
              '*/pages/**/_common/**/*',
              '*/pages/**/_help/**/*',
              '*/pages/**/_img/**/*',
            ],
            message:
              'Importing from dir pages with _ui, _common, _help, or _img is not allowed, can only be imported relatively',
          },
        ],
      },
    ],
  },
}
