import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import testingLibrary from 'eslint-plugin-testing-library';
import tailwind from 'eslint-plugin-tailwindcss';
import prettierConfig from 'eslint-config-prettier';

const isTestFile = (filePath = '') => /.*(spec|test)\.(ts|tsx)$/.test(filePath);

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json'],
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser
      }
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      tailwind,
      'testing-library': testingLibrary
    },
    settings: {
      react: {
        version: 'detect'
      },
      tailwindcss: {
        callees: ['cn', 'clsx']
      }
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-max-depth': ['warn', { max: 6 }],
      'react-hooks/exhaustive-deps': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' }
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      'tailwindcss/classnames-order': 'warn',
      'tailwindcss/no-custom-classname': 'off',
      'testing-library/no-debugging-utils': 'off'
    }
  },
  {
    files: ['src/**/*.{test,spec}.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.app.json']
      },
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      'testing-library': testingLibrary
    },
    rules: {
      ...testingLibrary.configs.react.rules,
      'testing-library/await-async-utils': 'error'
    }
  },
  {
    ignores: [
      'dist',
      'node_modules',
      'src/data/products.json'
    ]
  },
  prettierConfig
);
