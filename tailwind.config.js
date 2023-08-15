/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        veryDarkGrey: "hsl(0, 0%, 17%)",
        DarkGrey: "hsl(0, 0%, 59%)",
      },
      backgroundImage: {
        iconArrow: "url('./images/icon-arrow.svg')",
        iconLocation: "url('./images/icon-location.svg')",
        bgDesktop: "url('./images/pattern-bg-desktop.png')",
        bgMobile: "url('./images/pattern-bg-mobile.png')",
      },
    },
  },
  plugins: [],
};
