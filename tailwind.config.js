module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },
    boxShadow: {
      inputShadow: '0px 5px 5px 0px rgba(77, 77, 77, .6)',
      nftShadow: '5px 5px 5px 0px rgba(65, 70, 82, .6)',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
