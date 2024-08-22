export default [
  {
    rules: {
      "no-unused-vars": ["error"],
      "no-irregular-whitespace": ["error"],
      "no-duplicate-imports": ["error"],
      "prefer-const": ["error"]
    },
    ignores: [
      "**/node_modules/**",
      "**/coverage/**"
    ]
  }
];