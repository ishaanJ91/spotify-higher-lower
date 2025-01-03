module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        xs: "300px",
        sm: "530px",
        md: "666px",
        lg: "900px",
        xl: "1200px",
      },
      textColor: {
        primary: "#83f23f",
      },
      backgroundColor: {
        primary: "#83f23f",
        dark: "#43a605",
        bg: "#242424",
      },
      borderColor: {
        primary: "#83f23f",
      },
    },
  },
  plugins: [],
};
