module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    // Reglas CRÍTICAS para React 17+
    'react/react-in-jsx-scope': 'off', // No necesitas import React
    
    // Reglas importantes pero no estrictas
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-unused-vars': 'warn',
    
    // React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    
    // React Refresh (Vite)
    'react-refresh/only-export-components': 'warn',
    
    // JSX
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
  },
  settings: {
    react: {
      version: 'detect', // Detecta automáticamente
    },
  },
  ignorePatterns: ['dist/', 'node_modules/'],
};