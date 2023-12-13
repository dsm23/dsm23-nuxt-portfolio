import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["Geist Mono", ...defaultTheme.fontFamily.mono],
        sans: ["Geist Sans", ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        threeDotsKey: {
          "93.75%, 100%": {
            opacity: "0.2",
          },
        },
      },
      animation: {
        threeDotsOne: "threeDotsKey 0.8s linear infinite",
        threeDotsTwo: "threeDotsKey 0.8s linear 0.15s infinite",
        threeDotsThree: "threeDotsKey 0.8s linear 0.3s infinite",
      },
    },
  },
  plugins: [],
};
