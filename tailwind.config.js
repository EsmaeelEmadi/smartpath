/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,tsx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          green: {
            50: '#f0fdf9',
            100: '#cbfcee',
            200: '#97f8df',
            300: '#5ceccd',
            400: '#2ad7b6',
            500: '#11b89b',
            600: '#0b9681',
            700: '#0d7868',
            800: '#105f55',
            900: '#124f47',
            950: '#03302c',
          },
          red: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#ffc9c9',
            300: '#fda4a4',
            400: '#fa6f6f',
            500: '#f24b4b',
            600: '#de2424',
            700: '#bb1a1a',
            800: '#9b1919',
            900: '#801c1c',
            950: '#460909',
          },
          golden: {
            50: '#fffbeb',
            100: '#fff3c6',
            200: '#ffe588',
            300: '#ffd966',
            400: '#ffbe20',
            500: '#f99c07',
            600: '#dd7402',
            700: '#b75106',
            800: '#943d0c',
            900: '#7a330d',
            950: '#461902',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
