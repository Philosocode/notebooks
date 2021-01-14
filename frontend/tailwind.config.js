module.exports = {
  purge: [["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"]],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1800px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
