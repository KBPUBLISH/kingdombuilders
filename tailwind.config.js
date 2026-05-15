/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f6f5fb",
          100: "#ecebf6",
          200: "#d4d1ea",
          300: "#aea8d4",
          400: "#857cba",
          500: "#665aa3",
          600: "#524689",
          700: "#43396f",
          800: "#39325c",
          900: "#241f3d",
          950: "#16122a",
        },
        gold: {
          50: "#fbf8ee",
          100: "#f5edcf",
          200: "#ecda9b",
          300: "#e2c065",
          400: "#daab3f",
          500: "#c98f27",
          600: "#ad6e1f",
          700: "#8b521d",
          800: "#74411f",
          900: "#63371f",
          950: "#391c0e",
        },
        parchment: "#fbf7ef",
      },
      fontFamily: {
        serif: ['"Fraunces"', '"Playfair Display"', "ui-serif", "Georgia", "serif"],
        sans: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
        hand: ['"Caveat"', '"Patrick Hand"', "ui-rounded", "cursive"],
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(36, 31, 61, 0.25)",
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 30px 80px -20px rgba(201, 143, 39, 0.45)",
      },
      backgroundImage: {
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "fade-in": "fadeIn 1s ease-out both",
        "float": "float 8s ease-in-out infinite",
        "float-slow": "floatSlow 12s ease-in-out infinite",
        "spin-slow": "spin 60s linear infinite",
        "marquee": "marquee linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        floatSlow: {
          "0%, 100%": {
            transform: "translateY(0) rotate(-2deg)",
          },
          "50%": {
            transform: "translateY(-18px) rotate(2deg)",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
