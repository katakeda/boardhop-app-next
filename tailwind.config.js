const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{html,js,tsx}',
    './components/**/*.{html,js,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.violet,
      },
      fontFamily: {
        sans: ['Lato', 'Open Sans', 'Roboto', 'Helvetica', 'Proxima Nova', 'Futura'],
      },
    },
  },
  plugins: [],
}
