module.exports = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  importOrder: ["<THIRD_PARTY_MODULES>", "^@c/(.*)$","^@l/(.*)$", "^@lb/(.*)$","^@p/(.*)$", "^@/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"]
};