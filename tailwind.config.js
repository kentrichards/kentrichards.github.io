const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['index.html', 'svg/*.svg', 'js/*.js'],
    theme: {
        screens: {
            'xs': '480px',
            ...defaultTheme.screens
        }
    },
    plugins: [require('@tailwindcss/forms')]
}

