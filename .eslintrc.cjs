/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  globals: {
    $ref: true,
    $computed: true,
    $: true,
  },
  rules: {
    "vue/multi-word-component-names": "off", // 关闭 vue component命名提示
    "@typescript-eslint/no-explicit-any": "off", //关闭any类型警告
    "@typescript-eslint/no-non-null-assertion": "off", // 关闭禁止非空断言
    "@typescript-eslint/no-this-alias": "off",
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
}
