import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import typescript from '@vue/eslint-config-typescript';

export default [
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  ...typescript(),
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
];

