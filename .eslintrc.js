module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/no-unescaped-entities': 'off',
    'jsx-a11y/aria-props': 'off', // Allow dynamic ARIA attributes
    'react/forbid-dom-props': 'off', // Allow inline styles when necessary
  },
};
