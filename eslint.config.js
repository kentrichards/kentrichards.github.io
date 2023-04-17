import globals from 'globals'
import js from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'

export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser
        },
        plugins: { jsdoc },
        rules: {
            ...js.configs.recommended.rules,
            ...jsdoc.configs.recommended.rules,
            semi: ['error', 'never'],
            quotes: ['error', 'single'],
            'comma-dangle': ['error', 'never']
        }
    }
]