module.exports = {
  tabWidth: 4,
  singleQuote: true,
  overrides: [
    {
      files: ['*.json', '.eslintrc.js', '.prettierrc.js'],
      options: {
        tabWidth: 2,
      },
    },
    {
      files: '*.html',
      options: {
        printWidth: 100,
      },
    },
  ],
};
