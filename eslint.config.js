import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist'] },
    {
      root: true,
      env: {
        browser: true,
        es2021: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint', 'react', 'import', 'fsd-import'],
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: './tsconfig.json',
          },
          alias: {
            map: [
              ['@/', '/src'],
              ['@/app', '/src/app'],
              ['@/pages', '/src/pages'],
              ['@/widgets', '/src/widgets'],
              ['@/features', '/src/features'],
              ['@/entities', '/src/entities'],
              ['@/shared', '/src/shared'],
            ],
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
          },
        },
      },
      rules: {
        // 1. Правила для Prettier
        'prettier/prettier': [
          'error',
          {
            printWidth: 100,
            singleQuote: true,
            trailingComma: 'es5',
          },
        ],

        // 2. Правила для импортов по FSD
        'import/no-unresolved': 'error',
        'import/named': 'error',
        'import/default': 'error',
        'import/namespace': 'error',
        "fsd-import/fsd-relative-path": "error",
        // Правила сортировки импортов
        'import/order': [
          'error',
          {
            'groups': [
              'builtin', // Встроенные модули (fs, path)
              'external', // Сторонние библиотеки
              'internal', // Внутренние модули (алиасы)
              ['parent', 'sibling', 'index'], // Родительские, дочерние, индексные
              'unknown',
            ],
            'pathGroups': [
              {
                pattern: '@/**',
                group: 'internal',
                position: 'after',
              },
              {
                pattern: '@/app/**',
                group: 'internal',
              },
              {
                pattern: '@/pages/**',
                group: 'internal',
              },
              {
                pattern: '@/widgets/**',
                group: 'internal',
              },
              {
                pattern: '@/features/**',
                group: 'internal',
              },
              {
                pattern: '@/entities/**',
                group: 'internal',
              },
              {
                pattern: '@/shared/**',
                group: 'internal',
              },
            ],
            'newlines-between': 'always',
            'alphabetize': {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],

        // 3. Запрет импорта из вышестоящих слоев
        'fsd-import/layer-imports': [
          'error',
          {
            ignoreImportPatterns: ['**/store/**', '**/testing/**'],
          },
        ],

        // 4. Требование импорта через public API (index.ts)
        'fsd-import/public-api-imports': [
          'error',
          {
            alias: '@',
            testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorator.tsx'],
          },
        ],

        // 5. Запрет абсолютных импортов в рамках одного слоя
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: ['@app/*/*', '@pages/*/*', '@widgets/*/*', '@features/*/*', '@entities/*/*', '@shared/*/*'],
                message: 'Используйте public API (index.ts) для импорта из соседних модулей',
              },
              // Запрещаем импорт из вышестоящих слоев
              {
                group: ['@app/*'],
                importNames: ['default'],
                message: 'Запрещен импорт из app слоя',
                allowImportNames: ['AppRouter', 'AppProvider'],
              },
            ],
          },
        ],

        // 6. Требование относительных импортов в рамках одного слоя
        'import/no-relative-parent-imports': [
          'error',
          {
            ignore: ['../**/index', '../../**/index'],
          },
        ],

        // 7. Дополнительные правила TypeScript
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // 8. Правила React
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
      },
    },
)
