module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        pokeball:
          "url('https://www.wallpaperflare.com/static/364/185/316/pok%C3%A9mon-pok%C3%A9-balls-artwork-pokeball-wallpaper.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
